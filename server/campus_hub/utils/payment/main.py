import razorpay
import os
import logging
from pydantic import ValidationError
from campus_hub.utils.response import response, message, Status
from typing import Optional

class RazorpayClient:
    def __init__(self) -> None:
        self.razorpay_id: str = os.environ.get("RAZORPAY_ID", "rzp_test_w2v4fpnqqM6VS8")
        self.razorpay_secret: str = os.environ.get(
            "RAZORPAY_SECRET", "PGQvUDTt9HEdpHzNWLgacGYX"
        )
        self.client = razorpay.Client(
            auth=(str(self.razorpay_id), str(self.razorpay_secret))
        )

    def create_order(self, amount, currency) -> Optional[str]:
        data = {
            "amount": amount,
            "currency": currency,
        }
        try:
            order_data = self.client.order.create(data=data)
            return order_data["id"]
        except ValidationError as ve:
            logging.error(
                response(
                    Status.BAD_REQUEST, **message(f"Invalid offer data: {str(ve)}")
                )
            )

    def verify_payment(
        self, razorpay_order_id, razorpay_payment_id, razorpay_signature
    ):
        try:
            self.client.utility.verify_payment_signature(
                {
                    "razorpay_order_id": razorpay_order_id,
                    "razorpay_payment_id": razorpay_payment_id,
                    "razorpay_signature": razorpay_signature,
                }
            )
        except Exception as e:
            return response(
                Status.BAD_REQUEST, **message(f"Invalid offer data: {str(e)}")
            )


rz_client = RazorpayClient()
