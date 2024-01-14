from flask import jsonify, request
from campus_hub.utils.db import db_connector
from datetime import datetime, timedelta
from collections import Counter
import bson.json_util as json_util

def get_offers():
    """
    Get a list of all offers from the MongoDB database.

    Returns:
        Flask response: JSON response containing the list of offers or error message.
    """
    try:
        # Assuming there is a collection named "offers" in your MongoDB database.
        offers_collection = db_connector.db.offers

        # Fetch all offers from the collection
        offers = list(offers_collection.find())

        if not offers:
            return json_util.dumps({"error": "No offers found"}), 404

        return json_util.dumps({"offers": offers}), 200

    except Exception as e:
        print(f"Error retrieving offers from MongoDB: {e}")
        return json_util.dumps({"error": "Internal Server Error"}), 500


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
            return json_util.dumps({"error": f"Offer with offer_id {offer_id} not found"}), 404

        db_connector.update_data(offers_collection_name, query, offer_data)

        return json_util.dumps({"message": "Offer updated successfully"}), 200

    except Exception as e:
        print(f"Error updating offer in MongoDB: {e}")
        return json_util.dumps({"error": "Internal Server Error"}), 500


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
            return json_util.dumps({"error": f"Offer with offer_id {offer_id} not found"}), 404

        db_connector.delete_data(offers_collection_name, query)

        return json_util.dumps({"message": "Offer deleted successfully"}), 200

    except Exception as e:
        print(f"Error updating offer in MongoDB: {e}")
        return json_util.dumps({"error": "Internal Server Error"}), 500


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
        trending_offers_result = db_connector.db[orders_collection_name].aggregate(
            pipeline
        )
        # Extract offer_ids and corresponding total_orders from the aggregation result
        offer_orders_counter = Counter(
            {result["_id"]: result["total_orders"] for result in trending_offers_result}
        )

        # Sort offer_ids based on total_orders in descending order
        sorted_offer_ids = [
            offer_id for offer_id, _ in offer_orders_counter.most_common()
        ]

        # Get offer details based on sorted offer_ids
        trending_offers_data = []

        for offer_id in sorted_offer_ids:
            offer_details = db_connector.query_data(
                offers_collection_name, {"offer_id": offer_id}
            )
            if offer_details:
                trending_offers_data.append(offer_details[0])

        return json_util.dumps({"trending_offers": trending_offers_data}), 200

    except Exception as e:
        print(f"Error retrieving trending offers from MongoDB: {e}")
        return json_util.dumps({"error": "Internal Server Error"}), 500
