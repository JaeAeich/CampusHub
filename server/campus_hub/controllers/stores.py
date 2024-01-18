from flask import request
from campus_hub.utils.db import db_connector
from campus_hub.models.offers import Offers
from campus_hub.utils.response import Status, APIResponse, response, message


def get_store_by_id(store_id):
    # Placeholder logic to get details of a specific service by ID
    return {"id": store_id, "name": "Store", "description": "Description"}


def get_trending_stores():
    # Placeholder logic to get details of a specific service by ID
    return {"id": 1, "name": "Store", "description": "Description"}


def get_offers_by_store_id(store_id):
    # Placeholder logic to get details of a specific service by ID
    return {"id": store_id, "name": "Store", "description": "Description"}


def get_reviews_by_store_id(store_id):
    # Placeholder logic to get details of a specific service by ID
    return {"id": store_id, "name": "Store", "description": "Description"}


def get_orders_by_store_id(store_id):
    # Placeholder logic to get details of a specific service by ID
    return {"id": store_id, "name": "Store", "description": "Description"}


def get_products_by_store_id(store_id):
    # Placeholder logic to get details of a specific service by ID
    return {"id": store_id, "name": "Store", "description": "Description"}


def update_product(product_id, request_data):
    # Placeholder logic to update a service by ID
    return {"message": "Service updated successfully"}


def delete_product(product_id):
    # Placeholder logic to delete a service by ID
    return {"message": "Service deleted successfully"}


def update_store(store_id, request_data):
    # Placeholder logic to update a service by ID
    return {"message": "Service updated successfully"}


def delete_store(store_id):
    # Placeholder logic to delete a service by ID
    return {"message": "Service deleted successfully"}


def add_offer(store_id) -> APIResponse:
    """
    Adds a new offer to the MongoDB database.

    Args:
        store_id (str): ID of the store to which the offer belongs.

    Returns:
        Flask response: JSON response containing the status of the operation.
    """

    offers_collection_name = "offers"
    _offer = request.get_json()

    try:
        # Check if the store with the specified store_id exists
        store_query = {"store_id": store_id}
        existing_store = db_connector.query_data("stores", store_query)

        if not existing_store:
            return response(Status.NOT_FOUND, **message("Store doesn't exist."))

        # Add the store_id to the offer_data before inserting into the database
        _offer["store_id"] = store_id

        offer_id: str = db_connector.generate_unique_id(offers_collection_name)

        offer: Offers = Offers(offer_id=offer_id, **_offer)

        db_connector.insert_data(offers_collection_name, offer.model_dump())

        return response(Status.SUCCESS, **{"id": offer_id})
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )


def add_product():
    # Placeholder logic to add a new service
    return {"message": "Product added successfully"}
