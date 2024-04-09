from campus_hub.models.carts import Cart
from campus_hub.models.orders import Order
from campus_hub.utils.db import db_connector
from campus_hub.utils.response import response, message, Status, APIResponse
from flask import request
from typing import Any, MutableMapping
from campus_hub.models.user import User
from pydantic import ValidationError
from pymongo.errors import PyMongoError


def add_user() -> APIResponse:
    """
    Add a new user to the database.

    Returns:
        Flask response: Response containing the id of the new user
    """

    users_collection_name = "users"
    carts_collection_name = "carts"
    request_json = request.json

    try:
        if request_json is not None:
            user_data: MutableMapping[Any, Any] = request_json
        else:
            user_data = {}

        # Generate a unique user ID
        user_id: str = db_connector.generate_unique_id(users_collection_name)
        user_data["user_id"] = user_id

        # create a cart for the user
        cart_id = db_connector.generate_unique_id(carts_collection_name)
        user_data["cart_id"] = cart_id
        db_connector.insert_data(
            carts_collection_name, {"cart_id": cart_id, "cart_items": []}
        )

        # create a wishlist for the user
        wishlist_cart_id = db_connector.generate_unique_id(carts_collection_name)
        user_data["wishlist_cart_id"] = wishlist_cart_id
        db_connector.insert_data(
            carts_collection_name, {"cart_id": cart_id, "cart_items": []}
        )

        # add order_ids as an empty list
        user_data["order_ids"] = []

        # Validate the incoming user data using Pydanctic model
        try:
            user: User = User(**user_data)
        except ValidationError as e:
            return response(
                Status.BAD_REQUEST, **message(f"Invalid user data: {str(e)}")
            )

        # Add the user to the database
        try:
            db_connector.insert_data(users_collection_name, user.model_dump())
        except PyMongoError as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Internal Server Error: {str(e)}"),
            )

        return response(Status.SUCCESS, **{"id": user_data["user_email"]})
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )


def get_user_by_id(user_email: str) -> APIResponse:
    """
    Get a user from the database using the user ID.

    Args:
        user_email (str): Unique identifier for the user.

    Returns:
        Flask response: Response containing the user data
    """

    users_collection_name = "users"

    query1 = {"user_email": user_email}
    query2 = {"user_id": user_email}
    projection = {"_id": False}

    try:
        _user_by_email = db_connector.query_data(
            users_collection_name, query1, projection
        )

        _user_by_id = db_connector.query_data(users_collection_name, query2, projection)

        _user = _user_by_email if _user_by_email else _user_by_id

        if not _user or len(_user) == 0:
            return response(
                Status.NOT_FOUND,
                **message(f"User with email_id {user_email} not found"),
            )

        try:
            user: User = User(**_user[0])
        except ValidationError as e:
            return response(
                Status.BAD_REQUEST, **message(f"Invalid user data in DB: {str(e)}")
            )

        return response(Status.SUCCESS, user=user.model_dump())
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Error retrieving user from MongoDB: {str(e)}"),
        )


def update_user_by_id(user_id: str):
    """
    Update a user in the database using the user ID.

    Args:
        user_id (str): Unique identifier for the user.

    Returns:
        Flask response: Response containing the user data
    """

    users_collection_name = "users"
    request_json = request.json
    query: dict = {"user_id": user_id}

    try:
        if request_json is not None:
            if ("user_id" in request_json) and (request_json["user_id"] != user_id):
                user_data: MutableMapping[Any, Any] = request_json
        else:
            user_data = {}

        # Validate the incoming user data using Pydanctic model
        try:
            user: User = User(**user_data)
        except ValidationError as e:
            return response(
                Status.BAD_REQUEST, **message(f"Invalid user data: {str(e)}")
            )

        try:
            db_connector.update_data(users_collection_name, query, user.model_dump())
        except LookupError as e:
            return response(
                Status.NOT_FOUND, **message(f"User does not exist: {str(e)}")
            )
        except PyMongoError as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Internal Server Error: {str(e)}"),
            )

        return response(Status.SUCCESS, **{"id": user_id})
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )


def delete_user_by_id(user_id: str) -> APIResponse:
    """
    Delete a user from the database using the user ID.

    Args:
        user_id (str): Unique identifier for the user.

    Returns:
        Flask response: JSON response containing the id of the deleted user.
    """

    users_collection_name = "users"
    query: dict = {"user_id": user_id}

    try:
        try:
            db_connector.delete_data(users_collection_name, query)
        except LookupError as e:
            return response(
                Status.NOT_FOUND, **message(f"User does not exist: {str(e)}")
            )
        except PyMongoError as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Internal Server Error: {str(e)}"),
            )

        return response(Status.SUCCESS, **{"id": user_id})
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )


def get_cart_by_id(user_id: str) -> APIResponse:
    """
    Get a user's cart from the database using the user ID.

    Args:
        user_id (str): Unique identifier for the user.

    Returns:
        Flask response: Response containing the user's cart data
    """

    users_collection_name = "users"

    query = {"user_id": user_id}
    projection = {"_id": False}

    try:
        _user = db_connector.query_data(users_collection_name, query, projection)

        if not _user or len(_user) == 0:
            return response(Status.NOT_FOUND, **message(f"User {user_id} not found"))

        try:
            user: User = User(**_user[0])
        except ValidationError as e:
            return response(
                Status.BAD_REQUEST, **message(f"Invalid user data: {str(e)}")
            )

        cart_id = user.cart_id
        _cart = db_connector.query_data("carts", {"cart_id": cart_id})

        try:
            cart: Cart = Cart(**_cart[0])
        except ValidationError as e:
            return response(
                Status.BAD_REQUEST, **message(f"Invalid cart data: {str(e)}")
            )

        return response(Status.SUCCESS, cart=cart.model_dump())
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Internal Server Error: {str(e)}"),
        )


def update_cart_by_id(user_id: str) -> APIResponse:
    """
    Update a user's cart in the database using the user ID.

    Args:
        user_id (str): Unique identifier for the user.

    Returns:
        Flask response: Response containing the user's cart data
    """

    carts_collection_name = "carts"
    request_json = request.json
    query: dict = {"user_id": user_id}

    try:
        if request_json is not None:
            cart_data: MutableMapping[Any, Any] = request_json
        else:
            cart_data = {}

        # Validate the incoming cart data using Pydanctic model
        try:
            cart: Cart = Cart(**cart_data)
        except ValidationError as e:
            return response(
                Status.BAD_REQUEST, **message(f"Invalid cart data in request: {str(e)}")
            )

        # fetch cart_id from user_id
        projection = {"_id": False, "cart_id": True}
        cart_id = db_connector.query_data("users", query, projection)
        if not cart_id or len(cart_id) == 0:
            return response(Status.NOT_FOUND, **message(f"User {user_id} not found"))

        query = {"cart_id": cart_id[0]["cart_id"]}

        print(cart.model_dump())
        print(query)
        try:
            db_connector.update_data(carts_collection_name, query, cart.model_dump())
        except LookupError as e:
            return response(
                Status.NOT_FOUND, **message(f"Cart does not exist: {str(e)}")
            )
        except PyMongoError as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Internal Server Error: {str(e)}"),
            )

        return response(Status.SUCCESS, **{"id": query["cart_id"]})
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )


def get_orders_by_user_id(user_id: str) -> APIResponse:
    """
    fetches order history of a user

    Arguments:
        user_id: str

    Returns:
        Flask response: JSON response containing the list of orders.
    """

    orders_collection_name = "orders"
    query = {"user_id": user_id}
    projection = {"_id": False}

    try:
        orders = db_connector.query_data(orders_collection_name, query, projection)
        if not orders or len(orders) == 0:
            return response(Status.NOT_FOUND, **message("No orders found."))

        # validate the incoming data using Pydantic model
        try:
            orderslist: list[Order] = [Order(**order) for order in orders]
        except ValidationError as ve:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Invalid order data in DB: {str(ve)}"),
            )

        return response(
            Status.SUCCESS, orders=[order.model_dump() for order in orderslist]
        )
    except PyMongoError as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )


def get_users() -> APIResponse:
    """
    Get a user from the database using the user ID.

    Args:
        user_email (str): Unique identifier for the user.

    Returns:
        Flask response: Response containing the user data
    """

    users_collection_name = "users"
    query: dict = {}
    projection = {"_id": False}

    try:
        _users = db_connector.query_data(users_collection_name, query, projection)

        try:
            user_ids = [User(**user).user_id for user in _users]
        except Exception as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Invalid product data in DB: {str(e)}"),
            )

        return response(Status.SUCCESS, **{"user_ids": user_ids})

    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Error retrieving user from MongoDB: {str(e)}"),
        )
