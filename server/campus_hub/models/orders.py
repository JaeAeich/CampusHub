from typing import List
from pydantic import BaseModel, validator, EmailStr
from carts import CartItem


class Order(BaseModel):
    """
    Pydantic model representing an order.

    Attributes:
        order_id: Unique identifier for the order.
        user_id: Identifier for the user placing the order.
        email_id: Email address for the order
        product_list: List of cart items in the order.
        store_id: Identifier for the store associated with the order.
        store_name: Name of the store
        delivery_status: Delivery status of the order
        amount_paid: Amount paid for the order.
        transaction_id: Identifier for the transaction related to the order.
        delivery_address: Address for delivering the order.
        seller_id: Identifier for the seller fulfilling the order.
    """

    order_id: str
    user_id: str
    email_id: EmailStr
    product_list: List[CartItem]
    store_id: str
    store_name: str
    delivery_status: bool
    amount_paid: float
    transaction_id: str
    delivery_address: str
    seller_id: str

    @validator(
        "order_id",
        "user_id",
        "product_list",
        "email_id" "store_id",
        "store_name",
        "delivery_status",
        "amount_paid",
        "transaction_id",
        "delivery_address",
        "seller_id",
        pre=True,
        always=True,
    )
    def validate_required_fields(cls, value):
        """
        Validator to ensure that required fields (order_id, user_id, product_list, store_id, delivery_status, amount_paid, transaction_id, delivery_address, seller_id) are always present.
        """
        required_fields = [
            "order_id",
            "user_id",
            "product_list",
            "email_id" "store_id",
            "store_name",
            "delivery_status",
            "amount_paid",
            "transaction_id",
            "delivery_address",
            "seller_id",
        ]
        missing_fields = [field for field in required_fields if not value.get(field)]

        if missing_fields:
            raise ValueError(
                f"The following fields are required and cannot be empty for order: {', '.join(missing_fields)}"
            )

        return value
