from typing import List, Optional, Literal
from pydantic import BaseModel


class User(BaseModel):
    """
    Pydantic model representing a user.

    Attributes:
        user_id: Unique identifier for the user.
        user_name: Name of the user.
        user_phone_number: Phone number of the user.
        user_email: Email address of the user.
        user_gender: Gender of the user.
        order_ids: List of order IDs associated with the user.
        user_image: Image reference of the user.
        user_address: Address of the user.
        cart_id: Cart ID of the user
        wishlist_cart_id : Cart ID of the wishlist
    """

    user_id: str
    user_name: str
    user_phone_number: str
    user_email: str
    user_gender: Literal["Male", "Female", "Other"]
    order_ids: List[str]
    user_image: Optional[str]
    user_address: str
    cart_id: str
    wishlist_cart_id: str


class UserIDs(BaseModel):
    user_ids: List[str]
