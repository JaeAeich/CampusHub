from flask import request
from campus_hub.utils.db import db_connector
from campus_hub.models.offers import Offers, OfferList
from campus_hub.models.store import Store
from campus_hub.models.review import  Reviews, ReviewList
from campus_hub.models.orders import OrderList, Order
from campus_hub.models.product   import ProductList, Product
from typing import List, Any
from campus_hub.utils.response import Status, APIResponse, response, message


def get_store_by_id(store_id) -> APIResponse:
    """
    Get details of a store by its store_id from the MongoDB database.
    Returns:
        Flask response: JSON response containing the list of sellers.
    """

    stores_collection_name = "stores"

    # Query without including _id field in the result
    query: dict = {"store_id": store_id}
    projection = {"_id": False}

    try:
        _store = db_connector.query_data(stores_collection_name, query, projection)

        # If there are no stores, raise a custom exception
        if not _store or len(_store) == 0:
            return response(Status.NOT_FOUND, **message("Store not found."))

        try:
            store: Store = Store(**_store[0])
        except Exception as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Invalid store data in DB: {str(e)}"),
            )

        # If stores are found, return a JSON response
        return response(Status.SUCCESS, store = store.model_dump())
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Error retrieving store from MongoDB: {e}"),
        )


def get_trending_stores() -> APIResponse:
    """
    Get a list of trending stores from the MongoDB database using order collection.
    Returns:
        Flask response: JSON response containing the list of sellers.
    """

    stores_collection_name = "stores"
    orders_collection_name = "orders"
    

    try:
        # aggregate pipeline
        _pipeline = (
            {"$group": {"_id": "$store_id", "order_count": {"$sum": 1}}},
            {"$sort": {"order_count": -1}},
            {"$limit": 10}  
        )

        # Get the top 10 trending stores from orders collection
        
        _order_collection = db_connector.get_collection(orders_collection_name)
        _trending_stores_cursor = _order_collection.aggregate(_pipeline)
        trending_stores = [{"store": entry["_id"], "order_count": entry["order_count"]} for entry in _trending_stores_cursor]

        # If there are no trending stores, raise a custom exception
        if not trending_stores or len(trending_stores) == 0:
            return response(Status.NOT_FOUND, **message("No trending stores found."))
        
        # Get the details of the trending stores from stores collection
        query = {"store_id": {"$in": [entry["store"] for entry in trending_stores]}}
        projection = {"_id": False}
        _stores = db_connector.query_data(stores_collection_name, query, projection)

        # If there are no stores, raise a custom exception
        if not _stores or len(_stores) == 0:
            return response(Status.NOT_FOUND, **message("No stores found."))
        
        try:
            stores: List[Store] = [Store(**s) for s in _stores]
        except Exception as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Invalid store data in DB: {str(e)}"),
            )
        
        store_list: List[Store] = [store.model_dump() for store in stores]

        return response(Status.SUCCESS, store_list = store_list)
    
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Error retrieving trending stores from MongoDB: {e}"),
        )


def get_offers_by_store_id(store_id) -> APIResponse:
    """
    Get a list of offers from the MongoDB database.
    Returns:
        Flask response: JSON response containing the list of sellers.
    """

    offers_collection_name = "offers"

    # Query without including _id field in the result
    query: dict = {"store_id": store_id}
    projection = {"_id": False}

    try:
        _offers = db_connector.query_data(offers_collection_name, query, projection)

        # If there are no offers, raise a custom exception
        if not _offers or len(_offers) == 0:
            return response(Status.NOT_FOUND, **message("No offers found."))

        try:
            offers: List[Offers] = [Offers(**o) for o in _offers]
        except Exception as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Invalid offer data in DB: {str(e)}"),
            )

        offer_list: OfferList = OfferList(offers=offers)

        # If offers are found, return a JSON response
        return response(Status.SUCCESS, **offer_list.model_dump())
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Error retrieving offers from MongoDB: {e}"),
        )


def get_reviews_by_store_id(store_id) -> APIResponse:
    """
    Get a list of reviews from the MongoDB database.
    Returns:
        Flask response: JSON response containing the list of sellers.
    """

    reviews_collection_name = "reviews"

    # Query without including _id field in the result
    query: dict = {"store_id": store_id}
    projection = {"_id": False}

    try:
        _reviews = db_connector.query_data(reviews_collection_name, query, projection)

        # If there are no reviews, raise a custom exception
        if not _reviews or len(_reviews) == 0:
            return response(Status.NOT_FOUND, **message("No reviews found."))

        try:
            reviews: List[Reviews] = [Reviews(**r) for r in _reviews]
        except Exception as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Invalid review data in DB: {str(e)}"),
            )
        
        review_list: ReviewList = ReviewList(review_list=reviews)

        # If reviews are found, return a JSON response
        return response(Status.SUCCESS, **review_list.model_dump())
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Error retrieving reviews from MongoDB: {e}"),
        )
    
def get_orders_by_store_id(store_id) -> APIResponse:
    """
    Get a list of orders from the MongoDB database.
    Returns:
        Flask response: JSON response containing the list of sellers.
    """

    orders_collection_name = "orders"

    # Query without including _id field in the result
    query: dict = {"store_id": store_id}
    projection = {"_id": False}

    try:
        _orders = db_connector.query_data(orders_collection_name, query, projection)

        # If there are no orders, raise a custom exception
        if not _orders or len(_orders) == 0:
            return response(Status.NOT_FOUND, **message("No orders found."))

        try:
            orders: List[Order] = [Order(**r) for r in _orders]
        except Exception as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Invalid order data in DB: {str(e)}"),
            )

        order_list: OrderList = OrderList(orders=orders)

        # If orders are found, return a JSON response
        return response(Status.SUCCESS, **order_list.model_dump())
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Error retrieving orders from MongoDB: {e}"),
        )

def get_products_by_store_id(store_id) -> APIResponse:
    """
    Get a list of products from the MongoDB database.
    Returns:
        Flask response: JSON response containing the list of sellers.
    """

    products_collection_name = "products"

    # Query without including _id field in the result
    query: dict = {"store_id": store_id}
    projection = {"_id": False}

    try:
        _products = db_connector.query_data(products_collection_name, query, projection)

        # If there are no products, raise a custom exception
        if not _products or len(_products) == 0:
            return response(Status.NOT_FOUND, **message("No products found."))

        try:
            products: List[Product] = [Product(**r) for r in _products]
        except Exception as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Invalid product data in DB: {str(e)}"),
            )

        product_list: ProductList = ProductList(products=products)

        # If products are found, return a JSON response
        return response(Status.SUCCESS, **product_list.model_dump())
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Error retrieving products from MongoDB: {e}"),
        )


def update_product(product_id) -> APIResponse:
    """
    Updates a product in the MongoDB database.
    
    Args:
        product_id (str): ID of the product to be updated.
        request_data (dict): Data to be updated.
        
    Returns:
        Flask response: JSON response containing the status of the operation.
    """

    products_collection_name = "products"
    request_data = request.json

    try:
        # Check if the product with the specified product_id exists
        product_query = {"product_id": product_id}
        existing_product = db_connector.query_data(products_collection_name, product_query)
        if not request_data:
            update_query: Any = request_data
        else:
            update_query = {}

        if not existing_product:
            return response(Status.NOT_FOUND, **message("Product doesn't exist."))

        # Update the product with the new data
        db_connector.update_data(products_collection_name, product_query, update_query)

        return response(Status.SUCCESS, **message("Product updated successfully"))
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )


def delete_product(product_id) -> APIResponse:
    """
    Deletes a product from the MongoDB database.
    
    Args:
        product_id (str): ID of the product to be deleted.
    """

    products_collection_name = "products"

    try:
        # Check if the product with the specified product_id exists
        product_query = {"product_id": product_id}
        existing_product = db_connector.query_data(products_collection_name, product_query)

        if not existing_product:
            return response(Status.NOT_FOUND, **message("Product doesn't exist."))

        # Delete the product
        db_connector.delete_data(products_collection_name, product_query)

        return response(Status.SUCCESS, **message("Product deleted successfully"))
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )

def update_store(store_id) -> APIResponse:
    """
    Updates a store in the MongoDB database.
    
    Args:
        store_id (str): ID of the store to be updated.
        request_data (dict): Data to be updated.
        
    Returns:
        Flask response: JSON response containing the status of the operation.
    """

    stores_collection_name = "stores"
    request_data = request.json

    try:
        # Check if the store with the specified store_id exists
        store_query = {"store_id": store_id}
        existing_store = db_connector.query_data(stores_collection_name, store_query)
        if not request_data:
            update_query: Any = request_data
        else:
            update_query = {}
        if not existing_store:
            return response(Status.NOT_FOUND, **message("Store doesn't exist."))

        # Update the store with the new data
        db_connector.update_data(stores_collection_name, store_query, update_query)

        return response(Status.SUCCESS, **message("Store updated successfully"))
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )


def delete_store(store_id) -> APIResponse:
    """
    Deletes a store from the MongoDB database.
    
    Args:
        store_id (str): ID of the store to be deleted.
    """

    stores_collection_name = "stores"

    try:
        # Check if the store with the specified store_id exists
        store_query = {"store_id": store_id}
        existing_store = db_connector.query_data(stores_collection_name, store_query)

        if not existing_store:
            return response(Status.NOT_FOUND, **message("Store doesn't exist."))

        # Delete the store
        db_connector.delete_data(stores_collection_name, store_query)

        return response(Status.SUCCESS, **message("Store deleted successfully"))
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )


def add_offer(store_id) -> APIResponse:
    """
    Adds a new offer to the MongoDB database.

    Args:
        store_id (str): ID of the store to which the offer belongs.

    Returns:
        Flask response: JSON response containing the status of the operation.
    """

    offers_collection_name = "offers"
    _offer = request.get_json()

    try:
        # Check if the store with the specified store_id exists
        store_query = {"store_id": store_id}
        existing_store = db_connector.query_data("stores", store_query)

        if not existing_store:
            return response(Status.NOT_FOUND, **message("Store doesn't exist."))

        # Add the store_id to the offer_data before inserting into the database
        _offer["store_id"] = store_id

        offer_id: str = db_connector.generate_unique_id(offers_collection_name)

        offer: Offers = Offers(offer_id=offer_id, **_offer)

        db_connector.insert_data(offers_collection_name, offer.model_dump())

        return response(Status.SUCCESS, **{"id": offer_id})
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )


def add_product() -> APIResponse:
    """
    Adds a new product to the MongoDB database.

    Returns:
        Flask response: JSON response containing the status of the operation.
    """

    products_collection_name = "products"
    _product = request.get_json()

    try:
        # Check if the store with the specified store_id exists
        store_query = {"store_id": _product["store_id"]}
        existing_store = db_connector.query_data("stores", store_query)

        if not existing_store:
            return response(Status.NOT_FOUND, **message("Store doesn't exist."))

        # Add the store_id to the product_data before inserting into the database
        _product["product_id"] = db_connector.generate_unique_id(products_collection_name)

        product: Product = Product(**_product)

        db_connector.insert_data(products_collection_name, product.model_dump())

        return response(Status.SUCCESS, **{"id": _product["product_id"]})
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )
