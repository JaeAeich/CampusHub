from flask import jsonify, request
from campus_hub.utils.db import db_connector
from datetime import datetime, timedelta
from campus_hub.utils.response import error, info
from campus_hub.models.offers import Offers
from campus_hub.utils.data import serialize_model


def get_offers():
    """
    Get a list of all offers from the MongoDB database.

    Returns:
        Flask response: JSON response containing the list of offers or error message.
    """
    try:
        offers_collection = db_connector.get_collection("offers")

        # Fetch all offers from the collection
        offers = list(offers_collection.find())

        if not offers:
            return error(404, "NotFound", "No offers found.")

        # Serialize each offer
        serialized_offers = serialize_model(Offers, offers)

        return serialized_offers

    except Exception as e:
        return error(404, "NotFound", "Offer not found.", e)


def update_offer(offer_id):
    """
    Update a specific offer by id.

    Args:
        offer_id (str): ID of the offer to be updated.

    Returns:
        Flask response: JSON response containing the updated offer or an error message.
    """
    try:
        offers_collection_name = "offers"
        offer_data = request.get_json()

        # Create a query dictionary to identify the offer by its offer_id
        query = {"offer_id": offer_id}

        # Check if the offer_id exists in the collection
        existing_offer = db_connector.query_data(offers_collection_name, query)

        if not existing_offer:
            return error(404, "NotFound", f"Offer with {offer_id} not found.")

        try:
            db_connector.update_data(offers_collection_name, query, offer_data)
        except Exception as e:
            return error(500, "ServerError", "Could not update offer.", e)

        return info(200, f"Update offer {offer_id}.")

    except Exception as e:
        return error(500, "ServerError", "Could not update.", e)


def delete_offer(offer_id):
    """
    Update a specific offer by id.

    Args:
        offer_id (str): ID of the offer to be deleted.

    Returns:
        Flask response: JSON response containing operation success message.
    """
    try:
        offers_collection_name = "offers"

        # Create a query dictionary to identify the offer by its offer_id
        query = {"offer_id": offer_id}

        # Check if the offer_id exists in the collection
        existing_offer = db_connector.query_data(offers_collection_name, query)

        if not existing_offer:
            return error(404, "NotFound", f"Offer with offer_id {offer_id} not found")

        db_connector.delete_data(offers_collection_name, query)

        return info(200, f"Offer {offer_id} deleted.")

    except Exception as e:
        return error(500, "ServerError", "Could not delete offer.", e)


def get_trending_offers():
    """
    Get trending offers with the maximum orders in the past 7 days from the MongoDB database.

    Returns:
        Flask response: JSON response containing the list of trending offers.
    """
    try:
        # Assuming there are collections named "offers" and "orders" in your MongoDB database.
        offers_collection_name = "offers"
        orders_collection_name = "orders"

        # Calculate the date 7 days ago from the current date
        seven_days_ago = datetime.utcnow() - timedelta(days=7)

        # Aggregate pipeline to get offers with maximum orders in the past 7 days
        pipeline = [
            {
                "$match": {
                    "created_at": {"$gte": seven_days_ago},
                }
            },
            {
                "$unwind": "$product_list",
            },
            {
                "$group": {
                    "_id": "$product_list.offer_id",
                    "total_orders": {"$sum": 1},
                }
            },
            {
                "$sort": {"total_orders": -1},
            },
            {
                "$limit": 5,
            },
        ]

        # Execute the aggregation pipeline on the "orders" collection
        trending_offers = db_connector.db[orders_collection_name].aggregate(pipeline)

        # Get the offer details based on the aggregated results
        trending_offers_data = []
        for result in trending_offers:
            offer_id = result["_id"]
            offer_details = db_connector.query_data(
                offers_collection_name, {"offer_id": offer_id}
            )
            if offer_details:
                trending_offers_data.append(serialize_model(Offers, offer_details[0]))

        return jsonify({"trending_offers": trending_offers_data}), 200

    except Exception as e:
        print(f"Error retrieving trending offers from MongoDB: {e}")
        return jsonify({"error": "Internal Server Error"}), 500
