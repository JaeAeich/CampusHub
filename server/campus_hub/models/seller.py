from typing import List, Optional, Union
from pydantic import BaseModel, validator, EmailStr
class Seller(BaseModel):
    """
    Pydantic model representing a seller. A seller is an individual or entity
    that provides products or services through associated stores.

    Attributes:
        seller_name: Name of the seller.
        seller_phone_number: Phone number associated with the seller.
        seller_email: Email associated with the seller.
        seller_gender: Gender of the seller.
        order_ids: List of order IDs associated with the seller.
        seller_image: Optional image reference representing the seller.
        seller_address: Address of the seller.
        seller_id: Unique identifier for the seller.
        store_ids: List of store IDs associated with the seller.
    """

    seller_name: str
    seller_phone_number: str
    seller_email: EmailStr
    seller_gender: Union['Male', 'Female', 'Other']
    order_ids: List[str]
    seller_image: Optional[str]
    seller_address: str
    seller_id: str
    store_ids: List[str]

    @validator(
        "seller_name",
        "seller_phone_number",
        "seller_email", "seller_gender", "order_ids", "seller_address",
        "seller_id",
        "store_ids",
        pre=True,
        always=True,
    )
    def validate_required_fields(cls, value):
        """
        Validator to ensure that required fields (seller_name, seller_phone_number, seller_email, seller_id, store_ids, seller_gender , order_ids, seller_address) are always present.
        """
        required_fields = [
            "seller_name",
            "seller_phone_number",
            "seller_email", "seller_gender", "order_ids", "seller_address",
            "seller_id",
            "store_ids"
        ]
        missing_fields = [field for field in required_fields if not value.get(field)]

        if missing_fields:
            raise ValueError(
                f"The following fields are required and cannot be empty for seller: {', '.join(missing_fields)}"
            )

        return value