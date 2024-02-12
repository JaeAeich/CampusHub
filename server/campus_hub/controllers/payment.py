from flask import request
from typing import MutableMapping, Any
from pydantic import ValidationError
from pymongo.errors import PyMongoError
from campus_hub.utils.db import db_connector
from campus_hub.utils.response import response, message, Status, APIResponse
from datetime import datetime
from campus_hub.utils.razorpay.main import RazorpayClient
from campus_hub.models.payment import Payment
import os
import hashlib, hmac

rz_client = RazorpayClient()
razorpay_id = os.environ.get("RAZORPAY_ID")
razorpay_secret = os.environ.get("RAZORPAY_SECRET")

def add_payment():
    """
    Adds a new payment to the MongoDB database.

    Arguements: Payment details.

    Returns:
        Flask response: JSON response containing the id of the new order.
    """
    payments_collection_name = "payments"
    request_json = request.json
    orders_collection_name = "orders"
    order_query:dict = {}
    projection = {"_id": False}

    try:
        if request_json is not None:
            payment_data: MutableMapping[Any, Any] = request_json
            order_query["order_id"] = payment_data["order_id"]
            # NOTE: Check if order exists
            _order = db_connector.query_data(
                orders_collection_name, order_query, projection
            )
            # If there are no orders, return 404 error
            if not _order or len(_order) == 0:
                return response(Status.NOT_FOUND, **message("Order does not exist."))
            secret_key = razorpay_secret.encode("utf-8")

            # Assuming payment_data["order_id"] and os.environ["RAZORPAY_ID"] are strings, you need to encode them to bytes
            order_id_bytes = str(payment_data["order_id"]).encode("utf-8")
            razorpay_id_bytes = razorpay_id.encode("utf-8")

            # Concatenate the bytes and then calculate the HMAC
            message = order_id_bytes + b"|" + razorpay_id_bytes
            payment_data["signature"] = hmac.new(
                secret_key,
                message,
                hashlib.sha256
            ).hexdigest()       
        else:
            payment_data = {}
        
        payment_data["payment_id"] = db_connector.generate_unique_id("payments")
        payment_data["created_at"] = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z'
        # Validate the incoming data using Pydantic model
        try:
            payment: Payment = Payment(**payment_data)
        except ValidationError as ve:
            return response(
                Status.BAD_REQUEST, **message(f"Invalid payment data: {str(ve)}")
            )

        # Add the order data to the database
        try:
            rz_client.verify_payment(razorpay_order_id=payment_data["order_id"], razorpay_payment_id=razorpay_id, razorpay_signature=payment_data["signature"])

        except Exception as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Error while creating Razorpay payment: {str(e)}")
            ) 
        try:
            db_connector.insert_data(payments_collection_name, payment.model_dump())

        except PyMongoError as e:
            return response(
                Status.INTERNAL_SERVER_ERROR,
                **message(f"Internal Server Error: {str(e)}"),
            )
        # Return a success response
        return response(Status.SUCCESS, **{"id": payment_data["payment_id"]})
    except Exception as e:
        return response(
            Status.INTERNAL_SERVER_ERROR, **message(f"Internal Server Error: {str(e)}")
        )   

def verify_payment(request_data):
    # Placeholder logic to verify payment status
    return {"message": "Payment status verified successfully"}
