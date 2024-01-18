from campus_hub.utils.db import db_connector
from campus_hub.models.seller import Seller, SellerList
from pydantic import ValidationError
from pymongo.errors import PyMongoError
from typing import MutableMapping, Any
from flask import request, jsonify, Response

from campus_hub.utils.exceptions import (
    DBQueryError,
    DBInsertionError,
    InvalidData,
    InconsistentDBData,
)


def get_sellers() -> Response:
    """
    Get a list of all sellers from the MongoDB database.
    Returns:
        Flask response: JSON response containing the list of sellers.
    """
    try:
        sellers_collection_name = "sellers"

        # Query without including _id field in the result
        query: dict = {}
        projection = {"_id": False}

        sellers = db_connector.query_data(sellers_collection_name, query, projection)

        # If there are no sellers, raise a custom exception
        if not sellers or len(sellers) == 0:
            raise DBQueryError("No sellers found.")

        try:
            sellers = [Seller(**s) for s in sellers]
        except ValidationError as ve:
            print(f"Validation Error: {ve}")
            raise InconsistentDBData("DB has inconsistent data.")

        seller_list: SellerList = SellerList(sellers=sellers)

        # If sellers are found, return a JSON response
        return jsonify(seller_list.model_dump())

    except Exception as e:
        print(f"Error retrieving sellers from MongoDB: {e}")
        return jsonify({"error": str(e)})


def add_seller() -> Response:
    """
    Adds a new seller to the MongoDB database.

    Returns:
        Flask response: JSON response containing the status of the operation.
    """
    try:
        sellers_collection_name = "sellers"
        request_json = request.json

        # Check if request.json is not None before assignment
        if request_json is not None:
            seller_data: MutableMapping[Any, Any] = request_json
        else:
            # Handle the case when request.json is None
            seller_data = {}

        # Add uui as seller id
        seller_id: str = db_connector.generate_unique_id("sellers")
        seller_data["seller_id"] = seller_id

        # Validate the incoming data using Pydantic model
        try:
            seller = Seller(**seller_data)
        except ValidationError as ve:
            print(f"Validation Error: {ve}")
            raise InvalidData("Invalid seller data.")

        # Add the seller data to the database
        try:
            db_connector.insert_data(sellers_collection_name, seller.dict())
        except PyMongoError as e:
            print(f"Error adding seller to MongoDB: {e}")
            raise DBInsertionError("Internal Server Error.")

        # Return a success response
        return jsonify({"seller_id": seller_id})
    except Exception as e:
        print(f"Error adding seller to MongoDB: {e}")
        raise DBInsertionError("Internal Server Error.")
