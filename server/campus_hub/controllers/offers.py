from flask import request
from campus_hub.utils.db import db_connector
from datetime import datetime, timedelta
from collections import Counter
from campus_hub.utils.response import Response, response
from campus_hub.models.offers import Offers, OffersList
from typing import Union


def get_offers() -> Union[OffersList, Response]:
    """
    Get a list of all offers from the MongoDB database.

    Returns:
        Flask response: JSON response containing the list of offers or error message.
    """
    try:
        # Assuming there is a collection named "offers" in your MongoDB database.
        offers_collection = db_connector.db.offers

        # Fetch all offers from the collection
        offers = offers_collection.find()

        if not offers:
            return response(404, "No offers found")

        offer_list = OffersList(offers=[Offers(**offer) for offer in offers])

        return offer_list.model_dump()

    except Exception as e:
        print(f"Error retrieving offers from MongoDB: {e}")
        return response(500, "Internal server error.")


def update_offer(offer_id) -> Response:
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
            return response(404, f"Offer with offer_id {offer_id} not found.")

        db_connector.update_data(offers_collection_name, query, offer_data)

        return response(200, f"Offer with offer_id {offer_id} updated successfully.")

    except Exception as e:
        print(f"Error updating offer in MongoDB: {e}")
        return response(500, "Internal Server Error.")


def delete_offer(offer_id) -> Response:
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
            return response(404, f"Offer with offer_id {offer_id} not found")

        db_connector.delete_data(offers_collection_name, query)

        return response(200, "Offer deleted successfully.")

    except Exception as e:
        print(f"Error updating offer in MongoDB: {e}")
        return response(500, "Internal Server Error.")


def get_trending_offers() -> Response:
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
            pipeline  # type: ignore[arg-type]
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
                trending_offers_data.append(Offers(**offer_details[0]))

        trending_offers = OffersList(offers=trending_offers_data)

        return trending_offers.model_dump()

    except Exception as e:
        print(f"Error retrieving trending offers from MongoDB: {e}")
        return response(500, "Internal Server Error")
