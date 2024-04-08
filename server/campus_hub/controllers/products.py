import re
from campus_hub.models.review import Reviews
from campus_hub.utils.db import db_connector
from campus_hub.utils.response import APIResponse, response, message, Status
from campus_hub.models.product import Product, ProductList
from flask import request


def get_products() -> APIResponse:
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

    product_id = request.args.get("product_id")
    service_id = request.args.get("service_id")
    store_id = request.args.get("store_id")
    max_rating = request.args.get("max_rating")
    min_rating = request.args.get("min_rating")
    category = request.args.get("category")
    search_query = request.args.get("search_query")
    current_page_number = int(request.args.get("current_page_number", 1))
    page_size = int(request.args.get("page_size", 10))

    # Query without including _id field in the result
    query: dict = {}
    if product_id:
        query["product_id"] = product_id
    if service_id:
        query["service_id"] = service_id
    if store_id:
        query["store_id"] = store_id
    if max_rating:
        query["rating"] = {"$lte": max_rating}
    if min_rating:
        query["rating"] = {"$gte": min_rating}
    if category:
        query["product_categories"] = {"$in": category}
    if search_query:
        regex_pattern = re.compile(re.escape(search_query), re.IGNORECASE)
        query["product_name"] = {"$regex": regex_pattern}

    projection = {"_id": False}

    try:
        _products = db_connector.query_data(products_collection_name, query, projection, current_page_number=current_page_number, page_size=page_size)

        # If there are no products, return 404 error
        if not _products or len(_products) == 0:
            return response(
                Status.NOT_FOUND, **message("No products found in the database.")
            )

        try:
            products = [Product(**product) for product in _products]
        except Exception as e:
            print("ERROR:", e)
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Invalid product data in DB: {str(e)}"),
            )
        
        product_list: ProductList = ProductList(products=products)
        total_items = db_connector.get_count(products_collection_name, query)
        total_pages = total_items // page_size
        if total_items % page_size > 0:
            total_pages += 1

        # If products are found, return a JSON response
        return response(Status.SUCCESS, page_size=page_size, current_page_number=current_page_number, total_pages=total_pages, **product_list.model_dump())
    except Exception as e:
        print("ERROR:", e)
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

    reviews_collection_name = "reviews"

    # Query without including _id field in the result
    query: dict = {}
    query["product_id"] = product_id
    projection = {"_id": False}

    try:
        _reviews = db_connector.query_data(reviews_collection_name, query, projection)

        # If there are no products, return 404 error
        if not _reviews or len(_reviews) == 0:
            return response(
                Status.NOT_FOUND,
                **message("No reviews found for the product in the database."),
            )

        try:
            reviews = [Reviews(**review) for review in _reviews]
        except Exception as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Invalid review data in DB: {str(e)}"),
            )

        # If products are found, return a JSON response
        return response(
            Status.SUCCESS, reviews=[review.model_dump() for review in reviews]
        )
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Error retrieving product from MongoDB: {e}"),
        )


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

        cost: float = products.product_cost

        # If products are found, return a JSON response
        return response(Status.SUCCESS, cost=cost)
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

    products_collection_name = db_connector.db["products"]

    # Query without including _id field in the result
    query: dict = {}

    if store_id:
        query["store_id"] = store_id

    try:
        max_cost = (
            products_collection_name.find(query).sort("product_cost", -1).limit(1)
        )
        min_cost = products_collection_name.find(query).sort("product_cost", 1).limit(1)

        # If products are found, return a JSON response
        return response(Status.SUCCESS, max_cost=max_cost, min_cost=min_cost)
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
        return response(
            Status.SUCCESS, products=[product.model_dump() for product in products]
        )
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Error retrieving product from MongoDB: {e}"),
        )
