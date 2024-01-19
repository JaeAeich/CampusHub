from typing import List
from pydantic import BaseModel
from campus_hub.models.carts import CartItem


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
    email_id: str
    product_list: List[CartItem]
    store_id: str
    store_name: str
    delivery_status: bool
    amount_paid: float
    transaction_id: str
    delivery_address: str
    seller_id: str

class OrderList(BaseModel):
    """
    Pydantic model representing a list of orders.

    Attributes:
        orders: list of orders
    """

    orders: List[Order]