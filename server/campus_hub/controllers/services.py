from campus_hub.utils.db import db_connector
from campus_hub.models.service import Service, ServiceList
from campus_hub.models.store import Store, StoreList
from campus_hub.models.offers import Offers, OffersList
from flask import request
from campus_hub.utils.response import response, message, Status, APIResponse
from typing import List
from typing import MutableMapping, Any
from pydantic import ValidationError
from pymongo.errors import PyMongoError
from datetime import datetime
from campus_hub.utils.distance_matix import get_distance_matrix


def get_services() -> APIResponse:
    """
    Get a list of all services from the MongoDB database.
    Returns:
        Flask response: JSON response containing the list of services.
    """

    services_collection_name = "services"

    # Query without including _id field in the result
    query: dict = {}
    projection = {"_id": False}

    try:
        _services = db_connector.query_data(services_collection_name, query, projection)

        # If there are no services, return an error response
        if not _services or len(_services) == 0:
            return response(Status.NOT_FOUND, **message("No services found."))

        try:
            services: List[Service] = [Service(**s) for s in _services]
        except Exception as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Invalid service data in DB: {str(e)}"),
            )

        service_list: ServiceList = ServiceList(services=services)

        # If services are found, return a JSON response
        return response(Status.SUCCESS, **service_list.model_dump())

    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Error retrieving services from MongoDB: {e}"),
        )


def add_service() -> APIResponse:
    """
    Adds a new service to the MongoDB database.

    Returns:
        Flask response: JSON response containing the id of the new service.
    """

    services_collection_name = "services"
    request_json = request.json

    try:
        # Check if request.json is not None before assignment
        if request_json is not None:
            service_data: MutableMapping[Any, Any] = request_json
        else:
            # Handle the case when request.json is None
            service_data = {}

        # Add uui as service id
        service_id: str = db_connector.generate_unique_id("services")
        service_data["service_id"] = service_id

        # Validate the incoming data using Pydantic model
        try:
            service: Service = Service(**service_data)
        except ValidationError as ve:
            return response(
                Status.BAD_REQUEST, **message(f"Invalid service data: {str(ve)}")
            )

        # Add the service data to the database
        try:
            db_connector.insert_data(services_collection_name, service.dict())
        except PyMongoError as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Internal Server Error: {str(e)}"),
            )

        # Return a success response
        return response(Status.SUCCESS, **{"id": service_id})
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )


def get_service_by_id(service_id):
    # Placeholder logic to get details of a specific service by ID
    return {"id": service_id, "name": "Service", "description": "Description"}


def update_service(service_id: str) -> APIResponse:
    """
    Updates a service to the MongoDB database.

    Args:
    service_id (str): The service id of the service to update.

    Returns:
        Flask response: JSON response containing the id of the updated service.
    """

    services_collection_name = "services"
    request_json = request.json
    query: dict = {"service_id": service_id}

    try:
        # Check if request.json is not None before assignment
        if request_json is not None:
            if (
                "service_id" in request_json
                and request_json["service_id"] == service_id
            ):
                service_data: MutableMapping[Any, Any] = request_json
            else:
                return response(
                    Status.BAD_REQUEST,
                    **message("Query and request service_id mismatch"),
                )

        else:
            # Handle the case when request.json is None
            service_data = {}

        # Validate the incoming data using Pydantic model
        try:
            service: Service = Service(**service_data)
        except ValidationError as ve:
            return response(
                Status.BAD_REQUEST, **message(f"Invalid service data: {str(ve)}")
            )

        # Update the service data to the database
        try:
            db_connector.update_data(services_collection_name, query, service.dict())
        except LookupError as e:
            return response(
                Status.NOT_FOUND, **message(f"Service does not exist: {str(e)}")
            )
        except PyMongoError as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Internal Server Error: {str(e)}"),
            )

        # Return a success response
        return response(Status.SUCCESS, **{"id": service_id})
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )


def delete_service(service_id: str) -> APIResponse:
    """
    Delete a service from the MongoDB database.

    Args:
        service_id (str): The service id of the service to delete.

    Returns:
        Flask response: JSON response containing the id of the deleted service.
    """

    services_collection_name = "services"
    query: dict = {"service_id": service_id}
    try:
        # Delete the service data from the database
        try:
            db_connector.delete_data(services_collection_name, query)
        except LookupError as e:
            return response(
                Status.NOT_FOUND, **message(f"Service does not exist: {str(e)}")
            )
        except PyMongoError as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Internal Server Error: {str(e)}"),
            )

        # Return a success response
        return response(Status.SUCCESS, **{"id": service_id})
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )


def get_stores_by_service_id(
    service_id: str,
    max_rating: float,
    min_rating: float,
    distance: float,
    category: str,
) -> APIResponse:
    """
    Get stores by service id from the MongoDB database.

    Args:
        service_id (str): The service id of the stores to be fetched.

    Returns:
        Flask response: JSON response containing the list of stores.
    """

    services_collection_name = "services"
    stores_collection_name = "stores"
    query: dict = {"service_id": service_id}

    if max_rating:
        query["rating"] = {"$lte": max_rating}
    if min_rating:
        query["rating"] = {"$gte": min_rating}
    if category:
        query["category"] = {"$in": category}
    projection = {"_id": False}

    try:
        _services = db_connector.query_data(services_collection_name, query, projection)

        # If there are no services, return an error response
        if not _services or len(_services) == 0:
            return response(Status.NOT_FOUND, **message("Service does not exist."))

        _stores = db_connector.query_data(stores_collection_name, query, projection)

        # If there are no stores, return an error response
        if not _stores or len(_stores) == 0:
            return response(
                Status.NOT_FOUND,
                **message(f"Stores with service_id {service_id} does not exist."),
            )

        try:
            stores: List[Store] = [Store(**s) for s in _stores]
        except Exception as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Invalid store data in DB: {str(e)}"),
            )

        store_list: StoreList = StoreList(stores=stores)

        # If distance is specified, filter stores by distance
        if distance:
            try:
                latitude_str = request.args.get("latitude")
                longitude_str = request.args.get("longitude")
                latitude: float = (
                    float(latitude_str) if latitude_str is not None else 0.0
                )
                longitude: float = (
                    float(longitude_str) if longitude_str is not None else 0.0
                )

                origin = (latitude, longitude)

                for store in stores:
                    destination = store.coordinates
                    distance_matrix = get_distance_matrix(origin, destination)
                    distance_str: str = (
                        distance_matrix.get("rows", [{}])[0]
                        .get("elements", [{}])[0]
                        .get("distance", {})
                        .get("text", "")
                    )
                    store.distance = distance_str
            except Exception as e:
                return response(
                    Status.INTERNAL_SERVER_ERROR,
                    **message(f"Error calculating distance: {str(e)}"),
                )

            stores = [
                store
                for store in stores
                if store.distance
                if float(store.distance.split(" ")[0]) <= distance
            ]

        # If stores are found, return a JSON response
        return response(Status.SUCCESS, **store_list.model_dump())

    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Error retrieving stores from MongoDB: {e}"),
        )


def get_products_by_service_id(service_id):
    # Placeholder logic to get details of a specific service by ID
    return {"id": service_id, "name": "Service", "description": "Description"}


def get_offers_by_service_id(service_id: str) -> APIResponse:
    """
    Get offers by service id from the MongoDB database.

    Args:
        service_id (str): The service id of the stores to be fetched.

    Returns:
        Flask response: JSON response containing the list of offers.
    """

    services_collection_name = "services"
    offers_collection_name = "offers"
    query: dict = {"service_id": service_id}
    projection = {"_id": False}

    try:
        _services = db_connector.query_data(services_collection_name, query, projection)

        # If there are no services, return an error response
        if not _services or len(_services) == 0:
            return response(Status.NOT_FOUND, **message("Service does not exist."))

        _offers = db_connector.query_data(offers_collection_name, query, projection)

        # If there are no offers, return an error response
        if not _offers or len(_offers) == 0:
            return response(
                Status.NOT_FOUND,
                **message(f"Offers with service_id {service_id} does not exist."),
            )

        try:
            offers: List[Offers] = [Offers(**s) for s in _offers]
            try:
                [datetime.fromisoformat(offer["created_at"]) for offer in _offers]
            except ValueError as e:
                return response(
                    Status.INTERNAL_SERVER_ERROR,
                    **message(f"Invalid offer data in DB: {str(e)}"),
                )
        except Exception as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Invalid offer data in DB: {str(e)}"),
            )

        offer_list: OffersList = OffersList(offers=offers)

        # If offers are found, return a JSON response
        return response(Status.SUCCESS, **offer_list.model_dump())

    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Error retrieving offers from MongoDB: {e}"),
        )
