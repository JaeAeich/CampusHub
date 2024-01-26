from campus_hub.utils.db import db_connector
from campus_hub.models.seller import Seller, SellerList
from campus_hub.models.store import Store, StoreList
from pydantic import ValidationError
from pymongo.errors import PyMongoError
from typing import MutableMapping, Any
from flask import request
from campus_hub.utils.response import response, message, Status, APIResponse
from typing import List


def get_sellers() -> APIResponse:
    """
    Get a list of all sellers from the MongoDB database.
    Returns:
        Flask response: JSON response containing the list of sellers.
    """

    sellers_collection_name = "sellers"

    # Get the query parameters
    try:
        _page_size = request.args.get('page_size')
        _current_page_number = request.args.get('current_page_number')
    except Exception as e:
        return response(
            Status.BAD_REQUEST,
            **message(f"Invalid query parameters: {str(e)}"),
        )
    
    # Query without including _id field in the result
    query: dict = {}
    projection = {"_id": False}

    try:
        if _page_size and _current_page_number:
            _sellers = db_connector.query_data(sellers_collection_name, query, projection, page_size= int(_page_size), current_page_number= int(_current_page_number))
        else:
            _sellers = db_connector.query_data(sellers_collection_name, query, projection)
        # If there are no sellers, raise a custom exception
        if not _sellers or len(_sellers) == 0:
            return response(Status.NOT_FOUND, **message("No sellers found."))

        try:
            sellers: List[Seller] = [Seller(**s) for s in _sellers]
        except Exception as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Invalid seller data in DB: {str(e)}"),
            )

        seller_list: SellerList = SellerList(sellers=sellers)

        total_number_of_sellers = db_connector.get_count(sellers_collection_name)

        # If sellers are found, return a JSON response
        return response(Status.SUCCESS, total_docs=total_number_of_sellers, **seller_list.model_dump())

    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Error retrieving sellers from MongoDB: {e}"),
        )


def add_seller() -> APIResponse:
    """
    Adds a new seller to the MongoDB database.

    Returns:
        Flask response: JSON response containing the status of the operation.
    """

    sellers_collection_name = "sellers"
    request_json = request.json

    try:
        # Check if request.json is not None before assignment
        if request_json is not None:
            seller_data: MutableMapping[Any, Any] = request_json
        else:
            # Handle the case when request.json is None
            seller_data = {}

        # Add uui as seller id
        seller_id: str = db_connector.generate_unique_id("sellers")
        seller_data["seller_id"] = seller_id

        # Validate the incoming data using Pydantic model
        try:
            seller: Seller = Seller(**seller_data)
        except ValidationError as ve:
            return response(
                Status.BAD_REQUEST, **message(f"Invalid seller data: {str(ve)}")
            )

        unique_fields = {
            "seller_email": seller_data["seller_email"],
        }

        # Add the seller data to the database
        try:
            db_connector.insert_data(
                sellers_collection_name, seller.dict(), unique_fields
            )
        except PyMongoError as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Internal Server Error: {str(e)}"),
            )

        # Return a success response
        return response(Status.SUCCESS, **{"id": seller_id})
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )


def get_seller_by_id(seller_email: str) -> APIResponse:
    """
    Get a seller from the database using the seller ID.

    Args:
        seller_email (str): Unique identifier for the seller.

    Returns:
        Flask response: Response containing the seller data
    """

    sellers_collection_name = "sellers"

    query = {"seller_email": seller_email}
    projection = {"_id": False}

    try:
        _seller = db_connector.query_data(sellers_collection_name, query, projection)

        if not _seller or len(_seller) == 0:
            return response(
                Status.NOT_FOUND,
                **message(f"Seller with email_id {seller_email} not found"),
            )

        try:
            seller: Seller = Seller(**_seller[0])
        except ValidationError as e:
            return response(
                Status.BAD_REQUEST, **message(f"Invalid seller data in DB: {str(e)}")
            )

        return response(Status.SUCCESS, seller=seller.model_dump())
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Error retrieving seller from MongoDB: {str(e)}"),
        )


def add_store(seller_id) -> APIResponse:
    """
    Adds a new store to the MongoDB database.

    Returns:
        Flask response: JSON response containing the status of the operation.
    """

    sellers_collection_name = "sellers"
    stores_collection_name = "stores"
    seller_query: dict = {"seller_id": seller_id}
    request_json = request.json

    projection = {"_id": False}

    try:
        # NOTE: Check if seller exists
        _sellers = db_connector.query_data(
            sellers_collection_name, seller_query, projection
        )

        # If there are no sellers, return 404 error
        if not _sellers or len(_sellers) == 0:
            return response(Status.NOT_FOUND, **message("seller does not exist."))

        # Check if request.json is not None before assignment
        if request_json is not None:
            store_data: MutableMapping[Any, Any] = request_json
        else:
            # Handle the case when request.json is None
            store_data = {}

        # Add uui as seller id
        store_id: str = db_connector.generate_unique_id("stores")
        store_data["store_id"] = store_id
        store_data["customer_order_ids"] = []
        store_data["product_ids"] = []

        # Validate the incoming data using Pydantic model
        try:
            store: Store = Store(**store_data)
        except ValidationError as ve:
            return response(
                Status.BAD_REQUEST, **message(f"Invalid store data: {str(ve)}")
            )

        # NOTE: Check if service exists
        # NOTE: This is done after validation to ensure that the service_id is present in the request
        services_collection_name = "services"
        service_query: dict = {"service_id": request_json["service_id"]}
        _services = db_connector.query_data(
            services_collection_name, service_query, projection
        )

        # If there are no services, return 404 error
        if not _services or len(_services) == 0:
            return response(Status.NOT_FOUND, **message("service does not exist."))

        # Add the store data to the database
        try:
            db_connector.insert_data(stores_collection_name, store.model_dump())
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


def get_stores_by_seller_id(seller_id: str) -> APIResponse:
    """
    Get stores by seller id from the MongoDB database.

    Args:
        seller_id (str): The seller id of the stores to be fetched.

    Returns:
        Flask response: JSON response containing the list of stores.
    """

    sellers_collection_name = "sellers"
    stores_collection_name = "stores"
    query: dict = {"seller_id": seller_id}
    projection = {"_id": False}

    try:
        _sellers = db_connector.query_data(sellers_collection_name, query, projection)

        # If there are no sellers, return an error response
        if not _sellers or len(_sellers) == 0:
            return response(Status.NOT_FOUND, **message("Seller does not exist."))

        _stores = db_connector.query_data(stores_collection_name, query, projection)

        # If there are no stores, return an error response
        if not _stores or len(_stores) == 0:
            return response(
                Status.NOT_FOUND,
                **message(f"Stores with seller_id {seller_id} does not exist."),
            )

        try:
            stores: List[Store] = [Store(**s) for s in _stores]
        except Exception as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Invalid store data in DB: {str(e)}"),
            )

        store_list: StoreList = StoreList(stores=stores)

        # If stores are found, return a JSON response
        return response(Status.SUCCESS, **store_list.model_dump())

    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Error retrieving stores from MongoDB: {e}"),
        )
