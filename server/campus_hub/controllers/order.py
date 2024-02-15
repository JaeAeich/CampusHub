from flask import request
from pydantic import ValidationError
from campus_hub.utils.response import response, message, Status, APIResponse
from campus_hub.utils.db import db_connector
from campus_hub.models.orders import Order
from pymongo.errors import PyMongoError
from typing import MutableMapping, Any
from pymongo import UpdateOne
from datetime import datetime
from campus_hub.utils.payment.main import rz_client
from typing import Optional


def get_order_history():
    # Placeholder logic to  get order history for a user
    return [
        {"id": 1, "service_id": 1, "user_id": 1, "status": "Completed"},
        {"id": 2, "service_id": 2, "user_id": 1, "status": "Pending"},
    ]


def add_order() -> APIResponse:
    """
    Adds a new order to the MongoDB database.

    Arguements: Order details.

    Returns:
        Flask response: JSON response containing the id of the new order.
    """

    users_collection_name = "users"
    stores_collection_name = "stores"
    orders_collection_name = "orders"
    request_json = request.json
    store_query: dict = {}
    projection = {"_id": False}

    try:
        # Check if request.json is not None before assignment
        if request_json is not None:
            order_data: MutableMapping[Any, Any] = request_json
            store_query["store_id"] = order_data["store_id"]
            # NOTE: Check if store exists
            _stores = db_connector.query_data(
                stores_collection_name, store_query, projection
            )
            # If there are no stores, return 404 error
            if not _stores or len(_stores) == 0:
                return response(Status.NOT_FOUND, **message("store does not exist."))
        else:
            # Handle the case when request.json is None
            order_data = {}

        # Add razorpay order
        try:
            order_id: Optional[str] = rz_client.create_order(
                amount=int(order_data["amount_paid"] * 100), currency="INR"
            )
        except Exception as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Error while creating Razorpay order: {str(e)}"),
            )

        order_data["created_at"] = (
            datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"
        )
        order_data["order_id"] = order_id

        # Validate the incoming data using Pydantic model
        try:
            order: Order = Order(**order_data)
        except ValidationError as ve:
            return response(
                Status.BAD_REQUEST, **message(f"Invalid order data: {str(ve)}")
            )

        # Add the order data to the database
        try:
            db_connector.insert_data(orders_collection_name, order.model_dump())
        except PyMongoError as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Internal Server Error: {str(e)}"),
            )

        try:
            # Update user's "order_ids" field
            user_query = {"user_email": order_data["email_id"]}
            user_update = {
                "$addToSet": {
                    "order_ids": order_id
                }  # Using $addToSet to avoid duplicates
            }
            user_update_query = UpdateOne(user_query, user_update)
            db_connector.get_collection(users_collection_name).bulk_write(
                [user_update_query]
            )

            # Update store's "customer_order_ids" field
            store_query = {"store_id": order_data["store_id"]}
            store_update = {
                "$addToSet": {
                    "customer_order_ids": order_id
                }  # Using $addToSet to avoid duplicates
            }
            store_update_query = UpdateOne(store_query, store_update)
            db_connector.get_collection(stores_collection_name).bulk_write(
                [store_update_query]
            )

        except PyMongoError as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Internal Server Error: {str(e)}"),
            )
        # Return a success response
        return response(Status.SUCCESS, **{"id": order_id})
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )


def get_order_by_id(order_id):
    # Placeholder logic to get details of a specific order by ID
    return {"id": order_id, "service_id": 1, "user_id": 1, "status": "Completed"}


def cancel_order(order_id):
    # Placeholder logic to cancel an order by ID
    return {"message": "Order canceled successfully"}
