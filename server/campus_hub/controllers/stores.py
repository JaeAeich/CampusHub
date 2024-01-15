from flask import request
from collections import Counter
import bson.json_util as json_util
from datetime import datetime, timedelta
from campus_hub.utils.db import db_connector
from campus_hub.utils.response import error, info
from dateutil.parser import parse
import pytz

utc = pytz.UTC

DB = db_connector.db
storeCollection = "stores"
productCollection = "products"
orderCollection = "orders"
reviewCollection = "review"
offerCollection = "offers"

def get_store_by_id(store_id:str):
    """
    Get a specific store by id.

    Returns:
        Flask response: JSON response containing the store details.
    """
    try:
        print("hi")
        if not db_connector.ping():
            return error(503, "Unable to connect to the MongoDB server")
        try:
            db_connector.get_collection(storeCollection)
        except LookupError:
            return error(404, f"{storeCollection} collection not found")
        query={"store_id": store_id}
        try:
            store= db_connector.query_data(storeCollection, query)

        except LookupError:
            return error(400, f"Store with store_id {store_id} not found")
        
        return info(200, json_util.dumps(store))

    except Exception as e:
        print(f"Error retrieving stores from MongoDB: {e}")
        return error(500, "Internal Server Error")



def get_trending_stores():
    """
    Get trending stores with the maximum orders in the past 7 days from the MongoDB database.

    Returns:
        Flask response: JSON response containing the list of trending stores.
    """
    try:
        if not db_connector.ping():
            return error(503, "Unable to connect to the MongoDB server")

        try:
            db_connector.get_collection(storeCollection)
        except LookupError:
            return error(404, f"{storeCollection} collection not found")

        try:
            db_connector.get_collection(orderCollection)
        except LookupError:
            return error(404, f"{orderCollection} collection not found")

        seven_days_ago = datetime.utcnow() - timedelta(days=7)

        # Aggregate pipeline to get stores with maximum orders in the past 7 days
        pipeline = [
            {
                "$match": {
                    "created_at": {"$gte": seven_days_ago},
                }
            },
            {
                "$unwind": "$product_list",
            },
            {
                "$group": {
                    "_id": "$store_id",
                    "total_orders": {"$sum": 1},
                }
            },
            {
                "$sort": {"total_orders": -1},
            },
            {
                "$limit": 5,
            },
        ]
        
        # Execute the aggregation pipeline on the "orders" collection
        trending_stores_result = DB[orderCollection].aggregate(pipeline)
        
        # Extract store_ids and corresponding total_orders from the aggregation result
        store_orders_counter = Counter(
            {result["_id"]: result["total_orders"] for result in trending_stores_result}
        )
        
        # Sort store_ids based on total_orders in descending order
        sorted_store_ids = [
            store_id for store_id, _ in store_orders_counter.most_common()
        ]
        trending_stores_data = []
        for store_id in sorted_store_ids:
            try:
                store_details = db_connector.query_data(
                    storeCollection, {"store_id": store_id}
                )

                if store_details:
                    trending_stores_data.append(store_details[0])

            except LookupError:
                print(f"LookupError: No store found with store_id: {store_id}. Skipping.")
                continue

        return info(200, json_util.dumps(trending_stores_data))

    except Exception as e:
        print(f"Error retrieving trending offers from MongoDB: {e}")
        return error(500, "Internal Server Error")

def get_offers_by_store_id(store_id):
    """
    Get offers of a specific store from the MongoDB database.

    Returns:
        Flask response: JSON response containing the list of offers of a store.
    """
    try:
        if not db_connector.ping():
            return error(503, "Unable to connect to the MongoDB server")
        try:
            db_connector.get_collection(offerCollection)
        except LookupError:
            return error(404, f"{offerCollection} collection not found")
        
        try:
            db_connector.get_collection(storeCollection)
        except LookupError:
            return error(404, f"{storeCollection} collection not found")
        
        query = {"store_id": store_id}
        try:
            offers=db_connector.query_data(offerCollection, query)
        except LookupError:
            return error(400, f"Offer with store_id {store_id} not found")

        return info(200, json_util.dumps(offers))

        
    except Exception:
        return {"message": "Error connecting to database"}, 500



def get_reviews_by_store_id(store_id):
    """
    Get reviews of a specific store from the MongoDB database.

    Returns:
        Flask response: JSON response containing the list of reviews of a store.
    """
    try:
        if not db_connector.ping():
            return error(503, "Unable to connect to the MongoDB server")

        try:
            db_connector.get_collection(reviewCollection)
        except LookupError:
            return error(404, f"{reviewCollection} collection not found")

        try:
            db_connector.get_collection(storeCollection)
        except LookupError:
            return error(404, f"{storeCollection} collection not found")
        
        try:
            query = {"store_id": store_id}
            reviews = db_connector.query_data(reviewCollection, query)
        except LookupError:
            return error(400, f"Reviews for store_id {store_id} not found")


        return info(200, json_util.dumps(reviews))

        
    except Exception:
        return {"message": "Error connecting to database"}, 500
    

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