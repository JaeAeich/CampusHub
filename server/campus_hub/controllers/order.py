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


def add_order() -> APIResponse:
    """
    Adds a new order to the MongoDB database.

    Arguments: Order details.

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


# TODO: Add the following function to the API spec with filters and pagination
def get_all_orders(): #! NOT IN API.YAML
    """
    fetches all orders

    Returns:
        Flask response: JSON response containing the list of orders.
    """
    orders_collection_name = "orders"
    projection = {"_id": False}
    try:
        orders = db_connector.query_data(orders_collection_name, {}, projection)
        if not orders or len(orders) == 0:
            return response(Status.NOT_FOUND, **message("No orders found."))

        return response(Status.SUCCESS, orders=orders)
    except PyMongoError as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )


def get_order_by_id(order_id):
    """
    fetches order details by order_id

    Arguments:
        order_id: str

    Returns:
        Flask response: JSON response containing the order details.
    """
    orders_collection_name = "orders"
    query = {"order_id": order_id}
    projection = {"_id": False}
    try:
        order = db_connector.query_data(orders_collection_name, query, projection)
        if not order or len(order) == 0:
            return response(Status.NOT_FOUND, **message("Order not found."))

        # validate the incoming data using Pydantic model
        try:
            order: Order = Order(**order[0])
        except ValidationError as ve:
            return response(
                Status.BAD_REQUEST, **message(f"Invalid order data: {str(ve)}")
            )

        return response(Status.SUCCESS, **order.model_dump())
    except PyMongoError as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )
