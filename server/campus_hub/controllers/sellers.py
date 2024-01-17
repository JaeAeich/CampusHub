from campus_hub.utils.db import db_connector
from campus_hub.models.seller import Seller, SellerList
from campus_hub.utils.response import Response, response
from pydantic import ValidationError 
from typing import Union
from flask import request

def get_sellers() -> Union[Response, SellerList]:
    """
    Get a list of all sellers from the MongoDB database.
    Returns:
        Flask response: JSON response containing the list of sellers.
    """
    try:
        sellers_collection_name = "sellers"

        # Query without including _id field in the result
        query = {}
        projection = {'_id': False}

        sellers = db_connector.query_data(sellers_collection_name, query, projection)

        # If there are no sellers, return a 404 Not Found response
        if not sellers:
            return response(404, "No sellers found.")

        try:
            sellers = [Seller(**s) for s in sellers]
        except ValidationError as ve:
            print(f"Validation Error: {ve}")
            return response(500, "DB has inconsistent data.")
        
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
        seller_data = request.json

        # Add uui as seller id
        seller_data["seller_id"] = db_connector.generate_unique_id('sellers')

        # Validate the incoming data using Pydantic model
        try:
            seller = Seller(**seller_data)
        except ValidationError as ve:
            print(f"Validation Error: {ve}")
            return response(405, "Invalid seller data.")

        # Add the seller data to the database
        db_connector.insert_data(sellers_collection_name, seller.dict())

        # Return a success response
        return response(200, "Seller added successfully.")

    except Exception as e:
        print(f"Error adding seller to MongoDB: {e}")
        return response(500, "Internal Server Error.")