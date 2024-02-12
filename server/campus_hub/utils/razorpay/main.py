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