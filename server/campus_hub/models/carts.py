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
        "cart_id",
        "carts",
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
