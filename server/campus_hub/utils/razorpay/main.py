from .import client
from pydantic import ValidationError
from campus_hub.utils.response import response, message, Status, APIResponse

class RazorpayClient:
    def create_order(self, amount, currency):
        data={
            "amount": 100,
            "currency":"INR",
        }
        try:
            order_data=client.order.create(data=data)
            return order_data
        except ValidationError as ve:
            return response(
                Status.BAD_REQUEST, **message(f"Invalid offer data: {str(ve)}")
            )
    
    def verify_payment(self, razorpay_order_id, razorpay_payment_id, razorpay_signature):
        try:
            client.utility.verify_payment_signature({'razorpay_order_id': razorpay_order_id, 'razorpay_payment_id': razorpay_payment_id, 'razorpay_signature': razorpay_signature})
        except Exception as e:
            return response(
                Status.BAD_REQUEST, **message(f"Invalid offer data: {str(e)}")
            )
    