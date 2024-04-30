from typing import List, Optional, Literal
from pydantic import BaseModel
from pymongo.errors import PyMongoError
from campus_hub.utils.db import db_connector
from campus_hub.models.seller import Seller
from campus_hub.models.store import Store
from campus_hub.models.product import Product
from campus_hub.models.payment import Payment
from campus_hub.models.user import User
from campus_hub.utils.response import response, message, Status, APIResponse
from flask import request

def add_seller() -> APIResponse:
    """
    Adds a new seller to the MongoDB database.
    Returns:
        Flask response: JSON response containing the status of the operation.
    """
    sellers_collection_name = "sellers"
    request_json = request.json

    try:
        seller_id: str = db_connector.generate_unique_id("sellers")
        request_json["seller_id"] = seller_id

        seller = Seller(**request_json)

        db_connector.insert_data(sellers_collection_name, seller.dict())

        return response(Status.SUCCESS, **{"id": seller_id})

    except PyMongoError as e:
        return response(Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {e}"))


def add_store() -> APIResponse:
    """
    Adds a new store to the MongoDB database.
    Returns:
        Flask response: JSON response containing the status of the operation.
    """
    stores_collection_name = "stores"
    request_json = request.json

    try:
        store_id: str = db_connector.generate_unique_id("stores")
        request_json["store_id"] = store_id

        store = Store(**request_json)

        db_connector.insert_data(stores_collection_name, store.dict())

        return response(Status.SUCCESS, **{"id": store_id})

    except PyMongoError as e:
        return response(Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {e}"))

def add_product() -> APIResponse:
    """
    Adds a new product to the MongoDB database.
    Returns:
        Flask response: JSON response containing the status of the operation.
    """
    products_collection_name = "products"
    request_json = request.json

    try:
        product_id: str = db_connector.generate_unique_id("products")
        request_json["product_id"] = product_id

        product = Product(**request_json)

        db_connector.insert_data(products_collection_name, product.dict())

        return response(Status.SUCCESS, **{"id": product_id})

    except PyMongoError as e:
        return response(Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {e}"))
      
def remove_seller(seller_id: str) -> APIResponse:
    """
    Remove a seller from the MongoDB database.
    Args:
        seller_id (str): Unique identifier for the seller.
    Returns:
        Flask response: JSON response containing the status of the operation.
    """
    sellers_collection_name = "sellers"
    query = {"seller_id": seller_id}

    try:
        db_connector.delete_data(sellers_collection_name, query)
        return response(Status.SUCCESS, **message(f"Seller with ID {seller_id} has been removed."))

    except PyMongoError as e:
        return response(Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {e}"))


def remove_store(store_id: str) -> APIResponse:
    """
    Remove a store from the MongoDB database.
    Args:
        store_id (str): Unique identifier for the store.
    Returns:
        Flask response: JSON response containing the status of the operation.
    """
    stores_collection_name = "stores"
    query = {"store_id": store_id}

    try:
        db_connector.delete_data(stores_collection_name, query)
        return response(Status.SUCCESS, **message(f"Store with ID {store_id} has been removed."))

    except PyMongoError as e:
        return response(Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {e}"))


def remove_product(product_id: str) -> APIResponse:
    """
    Remove a product from the MongoDB database.
    Args:
        product_id (str): Unique identifier for the product.
    Returns:
        Flask response: JSON response containing the status of the operation.
    """
    products_collection_name = "products"
    query = {"product_id": product_id}

    try:
        db_connector.delete_data(products_collection_name, query)
        return response(Status.SUCCESS, **message(f"Product with ID {product_id} has been removed."))

    except PyMongoError as e:
        return response(Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {e}"))
