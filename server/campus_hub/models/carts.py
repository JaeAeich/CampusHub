from typing import List, Optional
from pydantic import BaseModel


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


class Cart(BaseModel):
    """
    Pydantic model representing a collection of carts.

    Attributes:
        cart_id: Identifier for the user associated with the carts.
        cart_items: List of items in cart.
    """

    cart_id: str
    cart_items: List[str]
