from campus_hub.models.review import Reviews
from campus_hub.utils.db import db_connector
from campus_hub.utils.response import APIResponse, response, message, Status
from flask import request


def get_reviews() -> APIResponse:
    """
    Get all reviews from the MongoDB database with filters based on query parameters.
    Args:
        service_id (str): The service_id of the review to be fetched
        store_id (str): The store_id of the review to be fetched
    Returns:
        Flask response: JSON response containing the list of reviews.
    """

    reviews_collection_name = "reviews"

    product_id = request.args.get("product_id")
    store_id = request.args.get("store_id")

    # Query without including _id field in the result
    query: dict = {}
    if product_id:
        query["product_id"] = product_id
    if store_id:
        query["store_id"] = store_id

    projection = {"_id": False}

    try:
        _reviews = db_connector.query_data(reviews_collection_name, query, projection)

        # If there are no reviews, return 404 error
        if not _reviews or len(_reviews) == 0:
            return response(
                Status.NOT_FOUND, **message("No reviews found in the database.")
            )

        try:
            reviews = [Reviews(**review) for review in _reviews]
        except Exception as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Invalid review data in DB: {str(e)}"),
            )

        # If reviews are found, return a JSON response
        return response(Status.SUCCESS, **reviews[0].model_dump())
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR,
            **message(f"Error retrieving review from MongoDB: {e}"),
        )
