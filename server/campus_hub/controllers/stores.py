from flask import request
from campus_hub.utils.db import db_connector
from campus_hub.models.offers import Offers, OffersList
from campus_hub.models.store import Store, StoreList
from campus_hub.models.review import Reviews, ReviewList
from campus_hub.models.orders import OrderList, Order
from campus_hub.models.product import ProductList, Product
from typing import List, MutableMapping, Any, Sequence, Mapping
from campus_hub.utils.response import Status, APIResponse, response, message
from datetime import datetime, timedelta
from pydantic import ValidationError
from pymongo.errors import PyMongoError


def get_store_by_id(store_id) -> APIResponse:
    """
    Get details of a store by its store_id from the MongoDB database.
    Returns:
        Flask response: JSON response containing the list of stores.
    """

    stores_collection_name = "stores"

    # Query without including _id field in the result
    query: dict = {"store_id": store_id}
    projection = {"_id": False}

    try:
        _store = db_connector.query_data(stores_collection_name, query, projection)

        # If there are no stores, return 404 error
        if not _store or len(_store) == 0:
            return response(
                Status.NOT_FOUND,
                **message(f"Store with store_id {store_id} does not exist."),
            )

        try:
            store: Store = Store(**_store[0])
        except Exception as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Invalid store data in DB: {str(e)}"),
            )

        # If stores are found, return a JSON response
        return response(Status.SUCCESS, store=store.model_dump())
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
    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    try:
        # aggregate pipeline
        _pipeline : Sequence[Mapping[str, Any]] = [
            {
                "$addFields": {
                    "created_at": {"$dateFromString": {"dateString": "$created_at"}}
                }
            },
            {
                "$match": {
                    "created_at": {"$gte": seven_days_ago},
                }
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

        # Get the top 5 trending stores from orders collection

        _order_collection = db_connector.db[orders_collection_name]
        _trending_stores_cursor = _order_collection.aggregate(_pipeline)
        trending_stores = [
            {"store": entry["_id"], "order_count": entry["total_orders"]}
            for entry in _trending_stores_cursor
        ]

        # If there are no trending stores, return 404 error
        if not trending_stores or len(trending_stores) == 0:
            return response(Status.NOT_FOUND, **message("No trending stores found."))

        # Get the details of the trending stores from stores collection
        query = {"store_id": {"$in": [entry["store"] for entry in trending_stores]}}
        projection = {"_id": False}
        _stores = db_connector.query_data(stores_collection_name, query, projection)

        # If there are no stores, return 404 error
        if not _stores or len(_stores) == 0:
            return response(Status.NOT_FOUND, **message("No trending stores found."))
        try:
            stores: List[Store] = [Store(**s) for s in _stores]
        except Exception as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Invalid store data in DB: {str(e)}"),
            )

        store_list: StoreList = StoreList(stores=stores)

        return response(Status.SUCCESS, **store_list.model_dump())

    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Error retrieving trending stores from MongoDB: {e}"),
        )


def get_offers_by_store_id(store_id) -> APIResponse:
    """
    Get a list of offers of a store the MongoDB database.
    Returns:
        Flask response: JSON response containing the list of stores.
    """

    offers_collection_name = "offers"
    stores_collection_name = "stores"
    # Query without including _id field in the result
    query: dict = {"store_id": store_id}
    projection = {"_id": False}

    try:
        _stores = db_connector.query_data(stores_collection_name, query, projection)

        # If there are no stores, return 404 error
        if not _stores or len(_stores) == 0:
            return response(Status.NOT_FOUND, **message("Store does not exist."))

        _offers = db_connector.query_data(offers_collection_name, query, projection)

        # If there are no offers, return 404 error
        if not _offers or len(_offers) == 0:
            return response(
                Status.NOT_FOUND,
                **message(f"Offers with store_id {store_id} does not exist."),
            )

        try:
            offers: List[Offers] = [Offers(**o) for o in _offers]
        except Exception as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Invalid offer data in DB: {str(e)}"),
            )

        offer_list: OffersList = OffersList(offers=offers)

        # If offers are found, return a JSON response
        return response(Status.SUCCESS, **offer_list.model_dump())
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Error retrieving offers from MongoDB: {e}"),
        )


def get_reviews_by_store_id(store_id) -> APIResponse:
    """
    Get a list of reviews of a store from the MongoDB database.
    Returns:
        Flask response: JSON response containing the list of reviews.
    """

    reviews_collection_name = "reviews"
    stores_collection_name = "stores"
    # Query without including _id field in the result
    query: dict = {"store_id": store_id}
    projection = {"_id": False}

    try:
        _stores = db_connector.query_data(stores_collection_name, query, projection)

        # If there are no stores, return 404 error
        if not _stores or len(_stores) == 0:
            return response(Status.NOT_FOUND, **message("Store does not exist."))

        _reviews = db_connector.query_data(reviews_collection_name, query, projection)

        # If there are no reviews, return 404 error
        if not _reviews or len(_reviews) == 0:
            return response(
                Status.NOT_FOUND,
                **message(f"Reviews with store_id {store_id} does not exist."),
            )

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
    Get a list of orders of a store from the MongoDB database.
    Returns:
        Flask response: JSON response containing the list of orders.
    """

    orders_collection_name = "orders"
    stores_collection_name = "stores"
    # Query without including _id field in the result
    query: dict = {"store_id": store_id}
    projection = {"_id": False}

    try:
        _stores = db_connector.query_data(stores_collection_name, query, projection)

        # If there are no stores, return 404 error
        if not _stores or len(_stores) == 0:
            return response(Status.NOT_FOUND, **message("Store does not exist."))

        _orders = db_connector.query_data(orders_collection_name, query, projection)

        # If there are no orders, return 404 error
        if not _orders or len(_orders) == 0:
            return response(
                Status.NOT_FOUND,
                **message(f"Orders with store_id {store_id} does not exist."),
            )

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
    Get a list of products of a store from the MongoDB database.
    Returns:
        Flask response: JSON response containing the list of products.
    """

    products_collection_name = "products"
    stores_collection_name = "stores"
    # Query without including _id field in the result
    query: dict = {"store_id": store_id}
    projection = {"_id": False}

    try:
        _stores = db_connector.query_data(stores_collection_name, query, projection)

        # If there are no stores, return 404 error
        if not _stores or len(_stores) == 0:
            return response(Status.NOT_FOUND, **message("Store does not exist."))

        _products = db_connector.query_data(products_collection_name, query, projection)

        # If there are no products, return 404 error
        if not _products or len(_products) == 0:
            return response(
                Status.NOT_FOUND,
                **message(f"Products with store_id {store_id} does not exist."),
            )

        try:
            products: List[Product] = [Product(**r) for r in _products]
        except Exception as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Invalid order data in DB: {str(e)}"),
            )

        order_list: ProductList = ProductList(products=products)

        # If products are found, return a JSON response
        return response(Status.SUCCESS, **order_list.model_dump())
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Error retrieving products from MongoDB: {e}"),
        )


def update_store(store_id: str) -> APIResponse:
    """
    Updates a store in the MongoDB database.

    Returns:
        Flask response: JSON response containing the id of the updated store.
    """

    stores_collection_name = "stores"
    request_json = request.json
    query: dict = {"store_id": store_id}

    try:
        # Check if request.json is not None before assignment
        if request_json is not None:
            store_data: MutableMapping[Any, Any] = request_json
        else:
            # Handle the case when request.json is None
            store_data = {}

        # Validate the incoming data using Pydantic model
        try:
            store: Store = Store(**store_data)
        except ValidationError as ve:
            return response(
                Status.BAD_REQUEST, **message(f"Invalid store data: {str(ve)}")
            )

        # Update the store data to the database
        try:
            db_connector.update_data(stores_collection_name, query, store.dict())
        except LookupError as e:
            return response(
                Status.NOT_FOUND, **message(f"Store does not exist: {str(e)}")
            )
        except PyMongoError as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Internal Server Error: {str(e)}"),
            )

        # Return a success response
        return response(Status.SUCCESS, **{"id": store_id})
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )


def delete_store(store_id: str) -> APIResponse:
    """
    Delete a store from the MongoDB database.

    Returns:
        Flask response: JSON response containing the id of the deleted store.
    """

    stores_collection_name = "stores"
    query: dict = {"store_id": store_id}
    try:
        # Delete the store data from the database
        try:
            db_connector.delete_data(stores_collection_name, query)
        except LookupError as e:
            return response(
                Status.NOT_FOUND, **message(f"Store does not exist: {str(e)}")
            )
        except PyMongoError as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Internal Server Error: {str(e)}"),
            )

        # Return a success response
        return response(Status.SUCCESS, **{"id": store_id})
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )


def add_offer(store_id) -> APIResponse:
    """
    Adds a new offer to the MongoDB database.

    Returns:
        Flask response: JSON response containing the id of the new offer.
    """
    stores_collection_name = "stores"
    query: dict = {"store_id": store_id}
    offers_collection_name = "offers"
    request_json = request.json
    projection = {"_id": False}

    try:
        _stores = db_connector.query_data(stores_collection_name, query, projection)

        # If there are no stores, return 404 error
        if not _stores or len(_stores) == 0:
            return response(Status.NOT_FOUND, **message("Store does not exist."))

        # Check if request.json is not None before assignment
        if request_json is not None:
            offer_data: MutableMapping[Any, Any] = request_json
        else:
            # Handle the case when request.json is None
            offer_data = {}

        # Add uui as offer id
        offer_id: str = db_connector.generate_unique_id("offers")
        offer_data["offer_id"] = offer_id
        offer_data["store_id"] = store_id

        # Validate the incoming data using Pydantic model
        try:
            offer: Offers = Offers(**offer_data)
        except ValidationError as ve:
            return response(
                Status.BAD_REQUEST, **message(f"Invalid offer data: {str(ve)}")
            )

        # Add the offer data to the database
        try:
            db_connector.insert_data(offers_collection_name, offer.dict())
        except PyMongoError as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Internal Server Error: {str(e)}"),
            )

        # Return a success response
        return response(Status.SUCCESS, **{"id": offer_id})
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )


def add_product(store_id: str) -> APIResponse:
    """
    Adds a new product to the MongoDB database.

    Returns:
        Flask response: JSON response containing the status of the operation.
    """
    stores_collection_name = "stores"
    query: dict = {"store_id": store_id}
    products_collection_name = "products"
    request_json = request.json
    projection = {"_id": False}

    try:
        _stores = db_connector.query_data(stores_collection_name, query, projection)

        # If there are no stores, return 404 error
        if not _stores or len(_stores) == 0:
            return response(Status.NOT_FOUND, **message("Store does not exist."))

        # Check if request.json is not None before assignment
        if request_json is not None:
            product_data: MutableMapping[Any, Any] = request_json
        else:
            # Handle the case when request.json is None
            product_data = {}

        # Add uui as product id
        product_id: str = db_connector.generate_unique_id("products")
        product_data["product_id"] = product_id
        product_data["store_id"] = store_id

        # Validate the incoming data using Pydantic model
        try:
            product: Product = Product(**product_data)
        except ValidationError as ve:
            return response(
                Status.BAD_REQUEST, **message(f"Invalid product data: {str(ve)}")
            )

        # Add the product data to the database
        try:
            db_connector.insert_data(products_collection_name, product.dict())
        except PyMongoError as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Internal Server Error: {str(e)}"),
            )

        # Return a success response
        return response(Status.SUCCESS, **{"id": product_id})
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )
