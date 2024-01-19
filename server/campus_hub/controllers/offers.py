from campus_hub.utils.db import db_connector
from campus_hub.models.offers import Offers, OffersList
from flask import request
from campus_hub.utils.response import response, message, Status, APIResponse
from typing import List
from typing import MutableMapping, Any
from pydantic import ValidationError
from pymongo.errors import PyMongoError


def add_offer(request_data):
    # Placeholder logic to add a new service
    return {"message": "Offer added successfully"}


def get_trending_offers():
    # Placeholder logic to get details of a specific service by ID
    return {"id": 1, "name": "Store", "description": "Description"}


def get_offers() -> APIResponse:
    """
    Get a list of all offers from the MongoDB database.
    Returns:
        Flask response: JSON response containing the list of offers.
    """

    offers_collection_name = "offers"

    # Query without including _id field in the result
    query: dict = {}
    projection = {"_id": False}

    try:
        _offers = db_connector.query_data(offers_collection_name, query, projection)

        # If there are no offers, raise a custom exception
        if not _offers or len(_offers) == 0:
            return response(Status.NOT_FOUND, **message("No offers found."))

        try:
            offers: List[Offers] = [Offers(**s) for s in _offers]
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


def update_offer(offer_id: str) -> APIResponse:
    """
    Updates a offer in the MongoDB database.

    Returns:
        Flask response: JSON response containing the id of the updated offer.
    """

    offers_collection_name = "offers"
    request_json = request.json
    query: dict = {"offer_id": offer_id}

    try:
        # Check if request.json is not None before assignment
        if request_json is not None:
            offer_data: MutableMapping[Any, Any] = request_json
        else:
            # Handle the case when request.json is None
            offer_data = {}

        # Validate the incoming data using Pydantic model
        try:
            offer: Offers = Offers(**offer_data)
        except ValidationError as ve:
            return response(
                Status.BAD_REQUEST, **message(f"Invalid offer data: {str(ve)}")
            )

        # Update the offer data to the database
        try:
            db_connector.update_data(offers_collection_name, query, offer.dict())
        except LookupError as e:
            return response(
                Status.NOT_FOUND, **message(f"Offer does not exist: {str(e)}")
            )
        except PyMongoError as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Internal Server Error: {str(e)}"),
            )

        # Return a success response
        return response(Status.SUCCESS, **{"id": offer_id})
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )


def delete_offer(offer_id: str) -> APIResponse:
    """
    Delete a offer from the MongoDB database.

    Returns:
        Flask response: JSON response containing the id of the deleted offer.
    """

    offers_collection_name = "offers"
    query: dict = {"offer_id": offer_id}
    try:
        # Delete the offer data from the database
        try:
            db_connector.delete_data(offers_collection_name, query)
        except LookupError as e:
            return response(
                Status.NOT_FOUND, **message(f"Offer does not exist: {str(e)}")
            )
        except PyMongoError as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Internal Server Error: {str(e)}"),
            )

        # Return a success response
        return response(Status.SUCCESS, **{"id": offer_id})
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )
