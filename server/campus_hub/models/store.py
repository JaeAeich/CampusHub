from typing import List, Optional, Tuple
from pydantic import BaseModel


class Store(BaseModel):
    """
    Attributes:
        store_id: Unique identifier for the store.
        store_name: Name of the store.
        store_images: List of image references related to the store.
        store_description: Description of the store.
        store_categories: Categories associated with the store.
        store_phone_number: Phone number associated with the store.
        store_email: Email associated with the store.
        customer_order_ids: Orders associated with the store.
        product_ids: List of product IDs associated with the store.
        seller_id: Identifier for the seller associated with the store.
        service_id: Identifier for the service related to the store.
        coordinates: Coordinates representing the location of the store.
        store_address: Address of the store.
        timings: Timings associated with the store.
        overall_rating: Overall rating of the store.
    """

    store_id: str
    store_name: str
    store_images: List[str]
    store_description: Optional[str]
    store_categories: List[str]
    store_phone_number: str
    store_email: str
    customer_order_ids: List[str]
    product_ids: List[str]
    seller_id: str
    service_id: str
    coordinates: Tuple[float, float]
    store_address: str
    timings: Optional[Tuple[float, float]]
    overall_rating: Optional[float]
    offer_available: Optional[bool]


class StoreList(BaseModel):
    """
    Pydantic model representing list of store.

    Attributes:
        stores: Name of the store.
    """

    stores: List[Store]
