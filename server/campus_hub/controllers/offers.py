from campus_hub.utils.db import db_connector
from campus_hub.models.offers import Offers, OffersList
from flask import request
from campus_hub.utils.response import response, message, Status, APIResponse
from typing import List
from typing import MutableMapping, Any
from pydantic import ValidationError
from pymongo.errors import PyMongoError
from datetime import datetime, timedelta
from collections import Counter

def add_offer(request_data):
    # Placeholder logic to add a new service
    return {"message": "Offer added successfully"}


def get_trending_offers():
    # Placeholder logic to get details of a specific service by ID
    return {"id": 1, "name": "Store", "description": "Description"}


def get_offers():
    # Placeholder logic to get a list of available services
    return [
        {"id": 1, "name": "Service 1", "description": "Description 1"},
        {"id": 2, "name": "Service 2", "description": "Description 2"},
    ]


def update_offer(offer_id, request_data):
    # Placeholder logic to update a service by ID
    return {"message": "Service updated successfully"}


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

def get_trending_offers() -> APIResponse:
    """
    Get trending offers with the maximum orders in the past 7 days from the MongoDB database.

    Returns:
        Flask response: JSON response containing the list of trending offers.
    """
    # Assuming there are collections named "offers" and "orders" in your MongoDB database.
    offers_collection_name = "offers"
    orders_collection_name = "orders"
    try:
        # Calculate the date 7 days ago from the current date
        seven_days_ago = datetime.utcnow() - timedelta(days=7)

        # Aggregate pipeline to get offers with maximum orders in the past 7 days
        pipeline = [
            {
                "$addFields": {
                    "created_at": {
                        "$dateFromString": {
                            "dateString": "$created_at"
                        }
                    }
                }
            },
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

        if not offer_orders_counter or len(offer_orders_counter) == 0:
            return response(Status.NOT_FOUND, **message("No offers found."))
                

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
                try:
                    offer_details[0]: Offers = Offers(**offer_details[0])
                    created_at_datetime = datetime.strptime(offer_details[0].created_at, "%Y-%m-%dT%H:%M:%S.%fZ")

                    # Check if (validity_duration + created_at) is greater than or equal to today's date
                    expiration_date = created_at_datetime + timedelta(days=offer_details[0].validity_duration)
                    today_date = datetime.utcnow()

                    if expiration_date >= today_date:
                        trending_offers_data.append(offer_details[0].dict())
                    else:
                        continue
                except Exception as e:
                    return response(
                        Status.INTERNAL_SERVER_ERROR,
                        **message(f"Invalid offer data in DB: {str(e)}"),
                    )

        trending_offers_list: OffersList = OffersList(offers=trending_offers_data)

        # If offers are found, return a JSON response
        return response(Status.SUCCESS, **trending_offers_list.model_dump())

    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Error retrieving offers from MongoDB: {e}"),
        )
