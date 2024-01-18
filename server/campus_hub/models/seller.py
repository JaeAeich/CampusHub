from typing import List, Optional, Literal
from pydantic import BaseModel


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
    seller_email: str
    seller_gender: Literal["Male", "Female", "Other"]
    order_ids: List[str]
    seller_image: Optional[str]
    seller_address: str
    seller_id: str
    store_ids: List[str]


class SellerList(BaseModel):
    """
    Pydantic model representing list of seller.

    Attributes:
        sellers: Name of the seller.
    """

    sellers: List[Seller]
