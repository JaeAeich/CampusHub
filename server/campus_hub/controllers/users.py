from campus_hub.utils.db import db_connector
from campus_hub.utils.response import response, message, Status, APIResponse
from flask import request
from typing import Any, MutableMapping
from campus_hub.models.user import User
from pydantic import ValidationError


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
            carts_collection_name, {"cart_id": cart_id, "carts": []}
        )

        # create a wishlist for the user
        wishlist_cart_id = db_connector.generate_unique_id(carts_collection_name)
        user_data["wishlist_cart_id"] = wishlist_cart_id
        db_connector.insert_data(
            carts_collection_name, {"cart_id": cart_id, "carts": []}
        )

        # add order_ids as an empty list
        user_data["order_ids"] = []

        # Validate the incoming user data using Pydanctic model
        try:
            user: User = User(**user_data)
        except ValidationError as e:
            return response(
                Status.BAD_REQUEST, **message(f"Invalid service data: {str(e)}")
            )

        # Add the user to the database
        try:
            db_connector.insert_data(users_collection_name, user.dict())
        except Exception as e:
            return response(
                Status.INTERNAL_SERVER_ERROR, **message(f"Failed to add user: {str(e)}")
            )

        return response(Status.SUCCESS, **message(f"User {user_id} added successfully"))
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Failed to add user: {str(e)}")
        )


def get_user_by_id(user_id: str) -> APIResponse:
    """
    Get a user from the database using the user ID.

    Args:
        user_id (str): Unique identifier for the user.

    Returns:
        Flask response: Response containing the user data
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
                Status.BAD_REQUEST, **message(f"Invalid service data: {str(e)}")
            )

        return response(Status.SUCCESS, user=user.model_dump())
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Failed to get user: {str(e)}")
        )
