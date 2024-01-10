from pydantic import BaseModel, validator
from datetime import timedelta

class Offers(BaseModel):
    """
    Pydantic model representing a payment.

    Attributes:
        product_id: product id of the product
        store_id: store_id of the product
        discount: discount amount for the product
        validity_duration: expiration date of the discount
        offer_id: offer id for the product
    """

    product_id: str
    store_id: str
    discount: float
    validity_duration: timedelta
    offer_id: str

    @validator(
        "product_id", "store_id", "discount", "validity_duration", "offer_id",
        pre=True,
        always=True,
    )
    def validate_required_fields(cls, value):
        """
        Validator to ensure that required fields (product_id, store_id, discount, validity_duration, offer_id) are always present.
        """
        required_fields = [
            "product_id", "store_id", "discount", "validity_duration", "offer_id"
        ]
        missing_fields = [field for field in required_fields if not value.get(field)]

        if missing_fields:
            raise ValueError(
                f"The following fields are required and cannot be empty for payment: {', '.join(missing_fields)}"
            )

        return value



