from pydantic import BaseModel
from typing import List


class Offers(BaseModel):
    """
    Pydantic model representing a payment.

    Attributes:
        product_ids: product ids having offer
        service_id: service_id of the store
        store_id: store_id of the product
        discount: discount amount for the product
        validity_duration: expiration date of the discount
        offer_id: offer id for the product
    """

    product_ids: List[str]
    service_id: str
    store_id: str
    discount: float
    validity_duration: str
    offer_id: str
    created_at: str


class OffersList(BaseModel):
    """
    Pydantic model representing list of store.

    Attributes:
        stores: Name of the store.
    """

    offers: List[Offers]
