from typing import List, Optional
from pydantic import BaseModel, validator, EmailStr

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
    user_email: EmailStr
    user_gender: Union['Male', 'Female', 'Other']
    order_ids: List[str]
    user_image: Optional[str]
    user_address: str
    cart_id: str
    wishlist_cart_id: str

    @validator(
        "user_id",
        "user_name",
        "user_phone_number",
        "user_email",
        "user_gender",
        "user_address", 
        "cart_id", 
        "wishlist_cart_id",
        pre=True,
        always=True,
    )
    def validate_required_fields(cls, value):
        """
        Validator to ensure that required fields (user_id, user_name, user_phone_number, user_email, user_gender, user_address, order_ids, cart_id, wishlist_cart_id) are always present.
        """
        required_fields = [
        "user_id",
        "user_name",
        "user_phone_number",
        "user_email",
        "user_gender",
        "user_address", 
        "cart_id", 
        "wishlist_cart_id"
        ]
        missing_fields = [field for field in required_fields if not value.get(field)]

        if missing_fields:
            raise ValueError(
                f"The following fields are required and cannot be empty for user: {', '.join(missing_fields)}"
            )

        return value