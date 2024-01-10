from typing import List, Dict, Optional
from pydantic import BaseModel, validator, EmailStr
class Product(BaseModel):
    """
    Pydantic model representing a product.

    Attributes:
        product_id: Unique identifier for the product.
        product_categories: List of categories associated with the product.
        product_name: Name of the product.
        store_id: Identifier for the store associated with the product.
        service_id: Identifier for the store associated with the product.
        product_image: Image reference of the product.
        product_cost: Cost of the product.
        product_description: Description of the product.
        product_discount: Discount for the product.
        stock: Available quantity of the product.
        product_specifications: Dictionary of product specifications.
    """

    product_id: str
    product_categories: List[str]  
    product_name: str
    service_id: str
    store_id: str
    product_image: List[str]
    product_cost: float
    product_description: Optional[str]
    stock: int
    product_specifications: Optional[Dict]

    @validator(
        "product_id",
        "product_categories",
        "product_name",
        "store_id", 
        "service_id",
        "product_cost",
        "stock",
        pre=True,
        always=True,
    )
    def validate_required_fields(cls, value):
        """
        Validator to ensure that all required fields (product_id, product_categories, product_name, store_id, product_cost, stock) are always present.
        """
        required_fields = [
            "product_id",
            "product_categories",
            "product_name",
            "store_id", 
            "service_id",
            "product_cost",
            "stock"
        ]
        missing_fields = [field for field in required_fields if not value.get(field)]

        if missing_fields:
            raise ValueError(
                f"The following fields are required and cannot be empty for product: {', '.join(missing_fields)}"
            )

        return value