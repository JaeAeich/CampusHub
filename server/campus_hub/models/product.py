from typing import List, Dict, Optional
from pydantic import BaseModel


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
        stocks: Available quantity of the product.
        product_specifications: Dictionary of product specifications.
    """

    product_id: str
    product_categories: List[str]
    product_name: str
    store_id: str
    service_id: str
    product_image: List[str]
    product_cost: float
    product_description: Optional[str]
    stocks: int
    product_specifications: Optional[Dict]
    offer_id: str
