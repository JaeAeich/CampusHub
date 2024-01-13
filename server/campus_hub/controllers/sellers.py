from flask import jsonify, request
from campus_hub.utils.db import db_connector

def get_sellers():
    """
    Get a list of all sellers from the MongoDB database.

    Returns:
        Flask response: JSON response containing the list of sellers.
    """
    try:
        # Assuming there is a collection named "sellers" in your MongoDB database.
        sellers_collection_name = "sellers"

        # Fetch all sellers from the collection
        sellers = list(db_connector.query_data(sellers_collection_name, {}))

        # If there are no sellers, return a 404 Not Found response
        if not sellers:
            return jsonify({"error": "No sellers found"}), 404

        # Convert ObjectId to string for each seller
        for seller in sellers:
            seller['_id'] = str(seller['_id'])

        # If sellers are found, return a JSON response
        return jsonify({"sellers": sellers}), 200

    except Exception as e:
        print(f"Error retrieving sellers from MongoDB: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

def add_seller():
    """
    Adds a new seller to the MongoDB database.

    Returns:
        Flask response: JSON response containing the status of the operation.
    """
    try:
        # Assuming there is a collection named "sellers" in your MongoDB database.
        sellers_collection_name = "sellers"
        seller_data = request.get_json()

        db_connector.insert_data(sellers_collection_name, seller_data)

        return jsonify({"message": "seller added successfully"}), 201

    except Exception as e:
        print(f"Error adding seller to MongoDB: {e}")
        return jsonify({"error": "Internal Server Error"}), 500