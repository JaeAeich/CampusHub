from typing import List, Optional
from pydantic import BaseModel, validator

class CartItem(BaseModel):
    """
    Pydantic model representing a cart item.

    Attributes:
        product_id: Identifier for the product in the cart.
        quantity: Quantity of the product in the cart.
        wishlisted_price: Wishlisted price for the product.
    """

    product_id: str
    quantity: int
    wishlisted_price: Optional[float]

    @validator("product_id", "quantity", pre=True, always=True)
    def validate_required_fields(cls, value):
        """
        Validator to ensure that required fields (product_id, quantity) are always present.
        """
        required_fields = ["product_id", "quantity"]
        missing_fields = [field for field in required_fields if not value.get(field)]

        if missing_fields:
            raise ValueError(
                f"The following fields are required and cannot be empty for cart item: {', '.join(missing_fields)}"
            )

        return value


class Cart(BaseModel):
    """
    Pydantic model representing a collection of carts.

    Attributes:
        cart_id: Identifier for the user associated with the carts.
        carts: List of carts.
    """

    cart_id: str
    carts: List[str]

    @validator(
        "cart_id", "carts",
        pre=True,
        always=True,
    )
    def validate_user_id(cls, value):
        """
        Validator to ensure that (cart_id, carts) is not empty.
        """
        if not value:
            raise ValueError(
                "cart_id, carts is required and cannot be empty for carts."
            )
        return value
    
class Order(BaseModel):
    """
    Pydantic model representing an order.

    Attributes:
        order_id: Unique identifier for the order.
        user_id: Identifier for the user placing the order.
        email_id: Email address for the order
        product_list: List of cart items in the order.
        store_id: Identifier for the store associated with the order.
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

    @validator(
        "order_id",
        "user_id",
        "product_list", "email_id"
        "store_id", "store_name",
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
        "product_list", "email_id"
        "store_id", "store_name",
        "delivery_status",
        "amount_paid",
        "transaction_id",
        "delivery_address",
        "seller_id"
        ]
        missing_fields = [field for field in required_fields if not value.get(field)]

        if missing_fields:
            raise ValueError(
                f"The following fields are required and cannot be empty for order: {', '.join(missing_fields)}"
            )

        return value