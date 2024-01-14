from flask import request
from campus_hub.utils.db import db_connector
from campus_hub.utils.response import Response, response
from campus_hub.models.seller import Seller, SellerList
from typing import Union


def get_sellers() -> Union[Response, SellerList]:
    """
    Get a list of all sellers from the MongoDB database.

    Returns:
        Flask response: JSON response containing the list of sellers.
    """
    try:
        sellers_collection_name = "sellers"

        # Fetch all sellers from the collection
        sellers = list(db_connector.query_data(sellers_collection_name, {}))

        # If there are no sellers, return a 404 Not Found response
        if not sellers:
            response(404, "No sellers found.")

        # Convert ObjectId to string for each seller
        for seller in sellers:
            seller["_id"] = str(seller["_id"])

        sellers = [Seller(**s) for s in sellers]
        seller_list = SellerList(sellers=sellers)

        # If sellers are found, return a JSON response
        return seller_list.model_dump()

    except Exception as e:
        print(f"Error retrieving sellers from MongoDB: {e}")
        return response(500, "Internal Server Error.")


def add_seller() -> Response:
    """
    Adds a new seller to the MongoDB database.

    Returns:
        Flask response: JSON response containing the status of the operation.
    """
    try:
        sellers_collection_name = "sellers"
        seller_data = request.get_json()

        db_connector.insert_data(sellers_collection_name, seller_data)

        return response(201, "Seller added successfully")

    except Exception as e:
        print(f"Error adding seller to MongoDB: {e}")
        return response(500, "Internal Server Error.")
