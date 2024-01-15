from flask import request
from campus_hub.utils.db import db_connector
from datetime import datetime, timedelta
from collections import Counter
import bson.json_util as json_util
from campus_hub.utils.response import error, info
from dateutil.parser import parse
import pytz

utc = pytz.UTC

DB = db_connector.db
storeCollection = "stores"
productCollection = "products"
orderCollection = "orders"
offerCollection = "offers"


def get_offers():
    """
    Get a list of all offers from the MongoDB database.

    Returns:
        Flask response: JSON response containing the list of offers or error message.
    """
    try:
        if not db_connector.ping():
            return error(503, "Unable to connect to the MongoDB server")
        try:
            collection = db_connector.get_collection(offerCollection)
        except LookupError:
            return error(404, f"{offerCollection} collection not found")

        offers = collection.find()
        print(offers)
        return info(200, json_util.dumps({offers}))
    
    except Exception as e:
        print(f"Error retrieving offers from MongoDB: {e}")
        return error(500, "Internal Server Error")


def update_offer(offer_id):
    """
    Update a specific offer by id.

    Args:
        offer_id (str): ID of the offer to be updated.

    Returns:
        Flask response: JSON response containing the updated offer or an error message.
    """
    try:
        if not db_connector.ping():
            return error(503, "Unable to connect to the MongoDB server")

        try:
            db_connector.get_collection(offerCollection)
        except LookupError:
            return error(404, f"{offerCollection} collection not found")

        offer_data = request.get_json()

        query = {"offer_id": offer_id}

        if not offer_data:
            return error(400, "Offer data cannot be empty")

        try:
            db_connector.query_data(offerCollection, query)

        except LookupError:
            return error(400, f"Offer with offer_id {offer_id} not found")

        db_connector.update_data(offerCollection, query, offer_data)

        return info(200, "Offer updated successfully")

    except Exception as e:
        print(f"Error updating offer in MongoDB: {e}")
        return error(500, "Internal Server Error")


def delete_offer(offer_id):
    """
    Update a specific offer by id.

    Args:
        offer_id (str): ID of the offer to be deleted.

    Returns:
        Flask response: JSON response containing operation success message.
    """
    try:
        if not db_connector.ping():
            return error(503, "Unable to connect to the MongoDB server")

        try:
            db_connector.get_collection(offerCollection)
        except LookupError:
            return error(404, f"{offerCollection} collection not found")

        query = {"offer_id": offer_id}

        try:
            db_connector.query_data(offerCollection, query)

        except LookupError:
            return error(400, f"Offer with offer_id {offer_id} not found")

        db_connector.delete_data(offerCollection, query)

        return info(200, "Offer deleted successfully")

    except Exception as e:
        print(f"Error deleting offer in MongoDB: {e}")
        return error(500, "Internal Server Error")


def get_trending_offers():
    """
    Get trending offers with the maximum orders in the past 7 days from the MongoDB database.

    Returns:
        Flask response: JSON response containing the list of trending offers.
    """
    try:
        if not db_connector.ping():
            return error(503, "Unable to connect to the MongoDB server")

        try:
            db_connector.get_collection(offerCollection)
        except LookupError:
            return error(404, f"{offerCollection} collection not found")

        try:
            db_connector.get_collection(orderCollection)
        except LookupError:
            return error(404, f"{orderCollection} collection not found")

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
        trending_offers_result = DB[orderCollection].aggregate(pipeline)
        # Extract offer_ids and corresponding total_orders from the aggregation result
        offer_orders_counter = Counter(
            {result["_id"]: result["total_orders"] for result in trending_offers_result}
        )

        # Sort offer_ids based on total_orders in descending order
        sorted_offer_ids = [
            offer_id for offer_id, _ in offer_orders_counter.most_common()
        ]
        trending_offers_data = []
        print("hi")
        for offer_id in sorted_offer_ids:
            try:
                offer_details = db_connector.query_data(
                    offerCollection, {"offer_id": offer_id}
                )

                if offer_details:
                    created_date_str = offer_details[0]["created_at"]
                    validity_duration = offer_details[0]["validity_duration"]
                    if created_date_str and validity_duration is not None:
                        try:
                            # Parse the string representation of the created date to a datetime object
                            created_date = parse(created_date_str)

                            expiration_date = created_date + timedelta(
                                days=validity_duration
                            )

                            if expiration_date.replace(
                                tzinfo=utc
                            ) >= datetime.now().replace(tzinfo=utc):
                                trending_offers_data.append(offer_details[0])

                        except ValueError as e:
                            print(f"Error parsing created_date: {e}")
            except LookupError:
                print(
                    f"LookupError: No offer found with offer_id: {offer_id}. Skipping."
                )
                continue
        return info(200, json_util.dumps(trending_offers_data))

    except Exception as e:
        print(f"Error retrieving trending offers from MongoDB: {e}")
        return error(500, "Internal Server Error")
