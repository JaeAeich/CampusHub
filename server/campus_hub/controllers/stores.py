from flask import request
from campus_hub.utils.functions import parse_json
from campus_hub.utils.db import db_connector

DB = db_connector.db
storeCollection = DB["stores"]
productCollection = DB["products"]
orderCollection = DB["orders"]
reviewColleciton = DB["reviews"]
offerCollection = DB["offers"]

def get_store_by_id(store_id):
    """
    Returns a list of all stores.
    """
    try:
        cursor = storeCollection.find({}, limit=10)
        stores = {"data": list(cursor)}
    except Exception:
        return {"message": "Error connecting to database"}, 500

    return parse_json(stores), 200



def get_trending_stores():
    """
    Returns a list of all stores.
    """
    try:
        cursor = storeCollection.find({}, limit=10)
        stores = {"data": list(cursor)}
    except Exception:
        return {"message": "Error connecting to database"}, 500
    
    return {"id": 1, "name": "Store", "description": "Description"}


def get_offers_by_store_id(store_id):
    """
    Returns a list of all offers by store_id.
    """
    try:
        cursor = offerCollection.find({"store_id": store_id}, limit=10)
        offers = {"data": list(cursor)}
    except Exception:
        return {"message": "Error connecting to database"}, 500
    
    return {"data": offers}, 200


def get_reviews_by_store_id(store_id):
    """
    Returns a list of all reviews by store_id.
    """
    try:
        cursor = reviewColleciton.find({"store_id": store_id}, limit=10)
        reviews = {"data": list(cursor)}
    except Exception:
        return {"message": "Error connecting to database"}, 500
    
    return {"data": reviews}, 200

def get_orders_by_store_id(store_id):
    """
    Returns a list of all orders by store_id.
    """

    try:
        orderCollection
        cursor = orderCollection.find({"store_id": store_id})
        orders = {"data": list(cursor)}
    except Exception:
        return {"message": "Error connecting to database"}, 500
    return {"data": orders}, 200


def get_products_by_store_id(store_id):
    """
    Returns a list of all products by store_id.
    """
    try:
        cursor = productCollection.find({"store_id": store_id}, limit=10)
        products = {"data": list(cursor)}
    except Exception:
        return {"message": "Error connecting to database"}, 500
    
    return {"data": products}, 200


def update_product(product_id):
    """
    Updates a product given its ID.
    """
    request_data = request.get_json()

    product = productCollection.find_one({"product_id": product_id})
    if not product:
        return {"message": "Product not found"}, 404
    
    try:
        productCollection.update_one({"product_id": product_id}, {"$set": request_data})
        return {"message": "Service updated successfully"}
    except Exception:
        return {"message": "Error updating product"}, 500
    


def delete_product(product_id):
    """
    Deletes a product given its ID.
    """
    product = productCollection.find_one({"product_id": product_id})
    if not product:
        return {"message": "Product not found"}, 404
    
    try:
        productCollection.delete_one({"product_id": product_id})
        return {"message": "Service deleted successfully"}
    except Exception:
        return {"message": "Error deleting product"}, 500


def update_store(store_id):
    """
    Updates a store given its ID.
    """
    request_data = request.get_json()

    # TODO: Add validation for query and update

    store = storeCollection.find_one({"store_id": store_id})
    if not store:
        return {"message": "Store not found"}, 404

    try:
        storeCollection.update_one({"store_id": store_id}, {"$set": request_data})
        return {"message": "Store updated successfully"}
    except Exception:
        return {"message": "Error updating store"}, 500


def delete_store(store_id: str):
    """
    Deletes a store given its ID.
    """

    store = storeCollection.find_one({"store_id": store_id})
    if not store:
        return {"message": "Store not found"}, 404

    try:
        storeCollection.delete_one({"store_id": store_id})
        return {"message": "Store deleted successfully"}
    except Exception:
        return {"message": "Error deleting store"}, 500

def add_offer(self, store_id: str):
    return {"message": "Offer added successfully"}

def add_product(self, store_id: str):
    return {"message": "Product added successfully"}