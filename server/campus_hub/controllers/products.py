import re
from typing import Any, MutableMapping
from campus_hub.utils.db import db_connector
from campus_hub.utils.response import APIResponse, response, message, Status
from campus_hub.models.product import Product
from pydantic import ValidationError
from pymongo.errors import PyMongoError


def get_products(service_id, store_id, max_rating, min_rating) -> APIResponse:
    """
    Get all products from the MongoDB database with filters based on query parameters.
    Args:
        service_id (str): The service_id of the product to be fetched
        store_id (str): The store_id of the product to be fetched
        max_rating (int): The maximum rating of the product to be fetched
        min_rating (int): The minimum rating of the product to be fetched
    Returns:
        Flask response: JSON response containing the list of products.
    """

    products_collection_name = "products"

    # Query without including _id field in the result
    query: dict = {}
    if service_id:
        query["service_id"] = service_id
    if store_id:
        query["store_id"] = store_id
    if max_rating:
        query["rating"] = {"$lte": max_rating}
    if min_rating:
        query["rating"] = {"$gte": min_rating}
    
    projection = {"_id": False}

    try:
        _products = db_connector.query_data(products_collection_name, query, projection)

        # If there are no products, return 404 error
        if not _products or len(_products) == 0:
            return response(
                Status.NOT_FOUND, **message("No products found in the database.")
            )

        try:
            products = [Product(**product) for product in _products]
        except Exception as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Invalid product data in DB: {str(e)}"),
            )

        # If products are found, return a JSON response
        return response(Status.SUCCESS, products=[product.model_dump() for product in products])
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Error retrieving product from MongoDB: {e}"),
        )

def get_reviews_by_product_id(product_id) -> APIResponse:
    """
    Get reviews of a product by its product_id from the MongoDB database.
    Args:
        product_id (str): The product_id of the product to be fetched
    Returns:
        Flask response: JSON response containing the list of products.
    """

    return

def get_product_cost(product_id) -> APIResponse:
    """
    Get cost of a product by its product_id from the MongoDB database.
    Args:
        product_id (str): The product_id of the product to be fetched
    Returns:
        Flask response: JSON response containing the list of products.
    """

    products_collection_name = "products"

    # Query without including _id field in the result
    query: dict = {}
    query["product_id"] = product_id

    try:
        _products = db_connector.query_data(products_collection_name, query)

        # If there are no products, return 404 error
        if not _products or len(_products) == 0:
            return response(
                Status.NOT_FOUND, **message("No products found in the database.")
            )

        try:
            products = Product(**_products[0])
        except Exception as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Invalid product data in DB: {str(e)}"),
            )

        cost : int = products["product_cost"]

        # If products are found, return a JSON response
        return response(Status.SUCCESS, cost = cost)
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Error retrieving product from MongoDB: {e}"),
        )

def get_range_of_cost_in_store(store_id) -> APIResponse:
    """
    Get maximum and minimum cost of products in a store by its store_id from the MongoDB database.
    Args:
        store_id (str): The store_id of the store to be fetched
    Returns:
        Flask response: JSON response containing the list of products.
    """
    
    products_collection_name = "products"
    
    # Query without including _id field in the result
    query: dict = {}

    if store_id:
        query["store_id"] = store_id

    try:
        _products = db_connector.query_data(products_collection_name, query)

        # If there are no products, return 404 error
        if not _products or len(_products) == 0:
            return response(
                Status.NOT_FOUND, **message("No products found in the database.")
            )

        try:
            products = [Product(**product) for product in _products]
        except Exception as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Invalid product data in DB: {str(e)}"),
            )

        max_cost : float = 0
        min_cost : float = 1000000
        for product in products:
            if product["product_cost"] > max_cost:
                max_cost = product["product_cost"]
            if product["product_cost"] < min_cost:
                min_cost = product["product_cost"]

        # If products are found, return a JSON response
        return response(Status.SUCCESS, max_cost = max_cost, min_cost = min_cost)
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Error retrieving product from MongoDB: {e}"),
        )

def search_products(str_query, service_id) -> APIResponse:
    """
    Search for products in the MongoDB database based on string query.
    Args:
        str_query (str): The string query to be searched
        service_id (str): The service_id of the product to be fetched
    Returns:
        Flask response: JSON response containing the list of products.
    """

    products_collection_name = "products"

    # Convert the input string query to a regular expression with case-insensitive option
    regex_pattern = re.escape(" " + str_query)  # Escape special characters in the query
    regex_query = re.compile(f"^{regex_pattern}", re.IGNORECASE)

    # Query without including _id field in the result
    query: dict = {}
    query["product_name"] = {"$regex": regex_query}
    if service_id:
        query["service_id"] = service_id
    projection = {"_id": False}

    try:
        _products = db_connector.query_data(products_collection_name, query, projection)

        # If there are no products, return 404 error
        if not _products or len(_products) == 0:
            return response(
                Status.NOT_FOUND, **message("No products found in the database.")
            )

        try:
            products = [Product(**product) for product in _products]
        except Exception as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Invalid product data in DB: {str(e)}"),
            )

        # If products are found, return a JSON response
        return response(Status.SUCCESS, products=[product.model_dump() for product in products])
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Error retrieving product from MongoDB: {e}"),
        )
