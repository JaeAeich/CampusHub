from flask import jsonify, request
from campus_hub.utils.db import db_connector


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


def add_product(store_id):
    # Placeholder logic to add a product by store ID
    return {"message": "Service added successfully"}


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


def add_offer(store_id):
    """
    Adds a new offer to the MongoDB database.

    Args:
        store_id (str): ID of the store to which the offer belongs.

    Returns:
        Flask response: JSON response containing the status of the operation.
    """
    try:
        # Assuming there is a collection named "offers" in your MongoDB database.
        offers_collection_name = "offers"
        offer_data = request.get_json()

        # Check if the store with the specified store_id exists
        store_query = {"store_id": store_id}
        existing_store = db_connector.query_data("stores", store_query)

        if not existing_store:
            return jsonify({"error": f"Store with store_id {store_id} not found"}), 404

        # Add the store_id to the offer_data before inserting into the database
        offer_data["store_id"] = store_id

        db_connector.insert_data(offers_collection_name, offer_data)

        return jsonify({"message": "Offer added successfully"}), 201

    except Exception as e:
        print(f"Error adding offer to MongoDB: {e}")
        return jsonify({"error": "Internal Server Error"}), 500
