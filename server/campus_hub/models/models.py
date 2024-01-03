"""campus_hub schema models."""

from typing import List, Tuple, Dict
from pydantic import BaseModel


class ServiceModel(BaseModel):

    """Pydantic model representing a service. A service represents
    a category of shops that can be offered by a campus, like food,
    laundry, etc.

    Attributes:
        service_id (str): A unique identifier for the service.
        service_name (str): The name of the service.
        pics (str): Pictures or image references related to the service.
        service_cat (List[str]): Categories associated with the service.
        description (str): A description of the service.
    """

    service_id: str
    service_name: str
    pics: str
    service_cat: List[str]
    description: str


class StoreModel(BaseModel):
    """
    Pydantic model representing a store. A store represents a shop
    that is associated with a service. For example, a store can be
    a restaurant that offers food service.

    Attributes:
        store_id (str): Unique identifier for the store.
        seller_id (str): Identifier for the seller associated with the store.
        service_id (str): Identifier for the service related to the store.
        name (str): Name of the store.
        service_cat (List[str]): Categories offered by this store specifically.
        store_pic (str): Picture or image reference of the store.
        descr (str): Description of the store.
        prod (List[str]): List of product IDs associated with the store.
        location (Tuple[float, float]): Coordinates representing the location of the store.
        stripe_public_key (str): Store's unique stripe key that can be published.
    """

    store_id: str
    seller_id: str
    service_id: str
    name: str
    service_cat: List[str]
    store_pic: str
    descr: str
    prod: List[str]
    location: Tuple[float, float]
    stripe_public_key: str


class ProductModel(BaseModel):
    """
    Pydantic model representing a product. A product represents a
    product that is associated with a store. For example, a product
    can be a burger that is offered by a restaurant.

    Attributes:
        pro_id (str): Unique identifier for the product.
        seller_id (str): Identifier for the seller associated with the product.
        service_id (str): Identifier for the service related to the product.
        shop_id (str): Identifier for the shop associated with the product.
        name (str): Name of the product.
        product_cat (str): Category in which this product lies.
        cost (float): Cost of the product.
        pic (str): Picture or image reference of the product.
        desc (str): Description of the product.
        available_quantity (int): Available quantity of the product.
        specification (Dict): Product specifications.
        tags (List[str]): Additional tags associated with the product.
        ratings (float): Product ratings.
        comments (List[str]): Customer comments on the product.
        delivery_charges (float): Delivery charges for the product.
    """

    pro_id: str
    seller_id: str
    service_id: str
    shop_id: str
    name: str
    product_cat: str
    cost: float
    pic: str
    desc: str
    available_quantity: int
    specification: Dict
    tags: List[str]
    ratings: float
    comments: List[str]
    delivery_charges: float
