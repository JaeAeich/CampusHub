from typing import Union
from flask import request
from campus_hub.utils.db import db_connector
from campus_hub.utils.response import Response, response, response_id
from campus_hub.models.seller import Seller, SellerList
from pydantic import ValidationError

def get_sellers() -> Union[Response, SellerList]:
    """
    Get a list of all sellers from the MongoDB database.

    Returns:
        Flask response: JSON response containing the list of sellers.
    """
    try:
        sellers_collection_name = "sellers"

        # Fetch all sellers from the collection
        sellers = db_connector.query_data(sellers_collection_name, {})

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
        # sellers_collection_name = "sellers"
        # _seller = request.get_json()


        # seller_id = db_connector.generate_unique_id(sellers_collection_name)
        # _seller["seller_id"] = seller_id
        # # print("##########")
        # # print(dict(_seller)) #<class dict>
        # # print("##########")
        # # seller = Seller(**_seller)
        # try:
        #     Seller(**_seller)
        #     print("##########")
        #     print(Seller(**_seller)) #<class dict>
        #     print("##########")
        # except ValidationError as ve:
        #     print(f"ValidationError: {ve}")
        #     return response(400, f"Bad Request: {ve}")
        # db_connector.insert_data(sellers_collection_name, seller.model_dump())

        # Dummy data
        dummy_data = {
            "order_ids": ["123"],
            "seller_address": "123 Main St",
            "seller_email": "user@example.com",
            "seller_gender": "Male",
            "seller_image": ["image_url"],
            "seller_name": "John Doe",
            "seller_phone_number": "1234567890",
            "store_ids": ["store123"]
        }

        # Instantiate the Seller model with dummy data
        seller_instance = Seller(**dummy_data)

        # Print the instantiated model
        print("##########")
        print(seller_instance)
        print("##########")

        # return response_id(seller_id)
        return response_id("123")

    except Exception as e:
        print(f"Error adding seller to MongoDB: {e}")
        return response(500, "Internal Server Error.")
