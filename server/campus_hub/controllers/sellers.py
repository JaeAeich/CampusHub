from campus_hub.models.store import Store
from campus_hub.utils.db import db_connector
from campus_hub.models.seller import Seller, SellerList
from pydantic import ValidationError
from pymongo.errors import PyMongoError
from typing import MutableMapping, Any
from flask import request
from campus_hub.utils.response import response, message, Status, APIResponse
from typing import List


def get_sellers() -> APIResponse:
    """
    Get a list of all sellers from the MongoDB database.
    Returns:
        Flask response: JSON response containing the list of sellers.
    """

    sellers_collection_name = "sellers"

    # Query without including _id field in the result
    query: dict = {}
    projection = {"_id": False}

    try:
        _sellers = db_connector.query_data(sellers_collection_name, query, projection)

        # If there are no sellers, raise a custom exception
        if not _sellers or len(_sellers) == 0:
            return response(Status.NOT_FOUND, **message("No sellers found."))

        try:
            sellers: List[Seller] = [Seller(**s) for s in _sellers]
        except Exception as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Invalid seller data in DB: {str(e)}"),
            )

        seller_list: SellerList = SellerList(sellers=sellers)

        # If sellers are found, return a JSON response
        return response(Status.SUCCESS, **seller_list.model_dump())

    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Error retrieving sellers from MongoDB: {e}"),
        )


def add_seller() -> APIResponse:
    """
    Adds a new seller to the MongoDB database.

    Returns:
        Flask response: JSON response containing the status of the operation.
    """

    sellers_collection_name = "sellers"
    request_json = request.json

    try:
        # Check if request.json is not None before assignment
        if request_json is not None:
            seller_data: MutableMapping[Any, Any] = request_json
        else:
            # Handle the case when request.json is None
            seller_data = {}

        # Add uui as seller id
        seller_id: str = db_connector.generate_unique_id("sellers")
        seller_data["seller_id"] = seller_id

        # Validate the incoming data using Pydantic model
        try:
            seller: Seller = Seller(**seller_data)
        except ValidationError as ve:
            return response(
                Status.BAD_REQUEST, **message(f"Invalid seller data: {str(ve)}")
            )

        # Add the seller data to the database
        try:
            db_connector.insert_data(sellers_collection_name, seller.dict())
        except PyMongoError as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Internal Server Error: {str(e)}"),
            )

        # Return a success response
        return response(Status.SUCCESS, **{"id": seller_id})
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )


def add_store(seller_id) -> APIResponse:
    """
    Adds a new store to the MongoDB database.

    Returns:
        Flask response: JSON response containing the status of the operation.
    """

    sellers_collection_name = "sellers"
    stores_collection_name = "stores"
    seller_query: dict = {"seller_id": seller_id}
    request_json = request.json

    projection = {"_id": False}

    try:
        # NOTE: Check if seller exists
        _sellers = db_connector.query_data(
            sellers_collection_name, seller_query, projection
        )

        # If there are no sellers, return 404 error
        if not _sellers or len(_sellers) == 0:
            return response(Status.NOT_FOUND, **message("seller does not exist."))

        # Check if request.json is not None before assignment
        if request_json is not None:
            store_data: MutableMapping[Any, Any] = request_json
        else:
            # Handle the case when request.json is None
            store_data = {}

        # Add uui as seller id
        store_id: str = db_connector.generate_unique_id("stores")
        store_data["store_id"] = store_id

        # Validate the incoming data using Pydantic model
        try:
            store: Store = Store(**store_data)
        except ValidationError as ve:
            return response(
                Status.BAD_REQUEST, **message(f"Invalid store data: {str(ve)}")
            )

        # NOTE: Check if service exists
        # NOTE: This is done after validation to ensure that the service_id is present in the request
        services_collection_name = "services"
        service_query: dict = {"service_id": request_json["service_id"]}
        _services = db_connector.query_data(
            services_collection_name, service_query, projection
        )

        # If there are no services, return 404 error
        if not _services or len(_services) == 0:
            return response(Status.NOT_FOUND, **message("service does not exist."))

        # Add the store data to the database
        try:
            db_connector.insert_data(stores_collection_name, store.model_dump())
        except PyMongoError as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Internal Server Error: {str(e)}"),
            )

        # Return a success response
        return response(Status.SUCCESS, **{"id": store_id})
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )
