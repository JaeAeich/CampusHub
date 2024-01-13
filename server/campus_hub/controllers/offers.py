from flask import jsonify
from campus_hub.utils.db import db_connector


def add_offer(*arg, **kwargs):
    # Placeholder logic to add a new service
    return (arg, kwargs)


def get_trending_offers():
    # Placeholder logic to get details of a specific service by ID
    return {"id": 1, "name": "Store", "description": "Description"}


def get_offers():
    """
    Get a list of all offers from the MongoDB database.

    Returns:
        Flask response: JSON response containing the list of offers.
    """
    try:
        # Assuming there is a collection named "offers" in your MongoDB database.
        offers_collection = db_connector.db.offers

        # Fetch all offers from the collection
        offers = list(offers_collection.find())

        # If there are no offers, return a 404 Not Found response
        if not offers:
            return jsonify({"error": "No offers found"}), 404

        # If offers are found, return a JSON response
        return jsonify({"offers": offers}), 200

    except Exception as e:
        print(f"Error retrieving offers from MongoDB: {e}")
        return jsonify({"error": "Internal Server Error"}), 500


def update_offer(offer_id, request_data):
    # Placeholder logic to update a service by ID
    return {"message": "Service updated successfully"}


def delete_offer(offer_id):
    # Placeholder logic to delete a service by ID
    return {"message": "Service deleted successfully"}
