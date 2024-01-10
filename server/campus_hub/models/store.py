from typing import List, Optional, Tuple
from pydantic import BaseModel, validator, EmailStr
from pydantic_extra_types.phone_numbers import PhoneNumber


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
        stripe_public_key: Store's unique stripe key that can be published.
        timings: Timings associated with the store.
        overall_rating: Overall rating of the store.
    """

    store_id: str
    store_name: str
    store_images: List[str]
    store_description: Optional[str]
    store_phone_number: PhoneNumber
    store_email: EmailStr
    store_categories: List[str]
    customer_order_ids: List[str]
    product_ids: List[str]
    seller_id: str
    service_id: str
    coordinates: Tuple[float, float]
    store_address: str
    stripe_public_key: str
    timings: Optional[Tuple[float, float]]
    overall_rating: Optional[float]

    @validator(
        "store_id",
        "seller_id",
        "service_id",
        "store_images",
        "store_phone_number",
        "store_email",
        "store_categories",
        "store_name",
        "customer_order_ids",
        "coordinates",
        "store_address",
        "stripe_public_key",
        "product_ids",
        pre=True,
        always=True,
    )
    def validate_required_fields(cls, value):
        """
        Validator to ensure that all required fields (store_id, seller_id, service_id, store_images, store_name, store_phone_number, store_email, store_categories, coordinates, store_address, stripe_public_key, customer_order_ids, product_ids) are always present.
        """
        required_fields = [
            "store_id",
            "seller_id",
            "service_id",
            "store_images",
            "store_phone_number",
            "store_email",
            "store_categories",
            "store_name",
            "customer_order_ids",
            "coordinates",
            "store_address",
            "stripe_public_key",
            "product_ids",
        ]
        missing_fields = [field for field in required_fields if not value.get(field)]

        if missing_fields:
            raise ValueError(
                f"The following fields are required and cannot be empty for store: {', '.join(missing_fields)}"
            )

        return value
