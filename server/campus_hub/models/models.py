"""campus_hub schema models."""

from typing import List, Tuple, Dict
from pydantic import BaseModel, validator, EmailStr


class Service(BaseModel):
    """Pydantic model representing a service. A service represents
    a category of shops that can be offered by a campus, like food,
    laundry, etc.

    Attributes:
        service_id: A unique identifier for the service.
        service_name: The name of the service.
        service_image: Pictures or image references related to the service.
        service_category: Categories associated with the service.
        service_description: A description of the service.
    """

    service_id: str
    service_name: str
    service_image: str
    service_category: List[str]
    service_description: str


class Store(BaseModel):
    """
    Pydantic model representing a store. A store represents a shop
    that is associated with a service. For example, a store can be
    a restaurant that offers food service.

    Attributes:
        store_id: Unique identifier for the store.
        store_name: Name of the store.
        store_image: Picture or image reference of the store.
        store_description: Description of the store.
        store_product_ids: List of product IDs associated with the store.
        store_location: Coordinates representing the location of the store.
        seller_id: Identifier for the seller associated with the store.
        service_id: Identifier for the service related to the store.
        service_category: Categories offered by this store specifically.
        stripe_public_key: Store's unique stripe key that can be published.
    """

    store_id: str
    store_name: str
    store_image: str
    store_description: str
    store_product_ids: List[str]
    store_location: Tuple[float, float]
    seller_id: str
    service_id: str
    service_category: List[str]
    stripe_public_key: str

    @validator(
        "store_id",
        "seller_id",
        "service_id",
        "stripe_public_key",
        pre=True,
        always=True,
    )
    def validate_required_fields(cls, value):
        """
        Validator to ensure that all required fields (IDs and stripe_public_key) are always present.
        """
        if not value:
            raise ValueError(
                "store_id, seller_id, service_id, stripe_public_key are required and cannot be empty for store."
            )
        return value


class Product(BaseModel):
    """
    Pydantic model representing a product. A product represents a
    product that is associated with a store. For example, a product
    can be a burger that is offered by a restaurant.

    Attributes:
        product_id (str): Unique identifier for the product.
        seller_id (str): Identifier for the seller associated with the product.
        service_id (str): Identifier for the service related to the product.
        store_id (str): Identifier for the store associated with the product.
        store_name (str): Store name of the product.
        product_category (str): Category in which this product lies.
        product_cost (float): Cost of the product.
        product_image (str): Image reference of the product.
        product_description (str): Description of the product.
        available_quantity (int): Available quantity of the product.
        specification (Dict): Product specifications.
        product_tags (List[str]): Additional tags associated with the product.
        product_ratings (float): Product ratings.
        product_comments (List[str]): Customer comments on the product.
        delivery_charges (float): Delivery charges for the product.
    """
    

    product_id: str
    seller_id: str
    service_id: str
    store_id: str
    product_name: str
    product_category: str
    product_cost: float
    product_image: str
    product_discount: float
    product_description: str
    available_quantity: int
    specification: Dict
    product_tags: List[str]
    product_ratings: float
    product_comments: List[str]
    delivery_charges: float
    
    @validator(
        "product_id",
        "seller_id",
    "service_id",
    "store_id",
    "product_cost",
        pre=True,
        always=True,
    ) 
    def validate_required_fields(cls, value):
        """
        Validator to ensure that all required fields (IDs and product_cost) are always present.
        """
        if not value:
            raise ValueError(
                "product_id, seller_id ,service_id ,store_id, product_cost are required and cannot be empty for product."
            )
        return value
    
class User(BaseModel):
    """
    Pydantic model representing a user. A user can be a student, guard, etc.

    Attributes:
        user_id: Unique identifier for the user.
        user_name: username of the user.
        phone_number: Phone number of the user.
        aadhaar_number: Aadhaar card information of the user.
        email_id: Email address of the user.
        orders_id: List of order IDs associated with the user.
        address: Address details of the user.
        meta: Additional metadata for the user.
        profile_image : Profile picture of the user.
    """

    user_id: str
    user_name: str
    phone_number: str
    aadhaar_number: str
    email_id: EmailStr
    orders_id: List[str]
    address: str
    meta: Dict
    profile_image : str

    @validator("user_id", "username", "aadhaar_card", "email_id", pre=True, always=True)
    def validate_required_fields(cls, value):
        """
        Validator to ensure that all required fields (IDs, username, aadhaar_card, email_id) are always present.
        """
        if not value:
            raise ValueError(
                "user_id, username, adhaar_card, email_id are required and cannot be empty for user."
            )
        return value
    
class Seller(BaseModel):
    """
    Pydantic model representing a seller. A seller can be a student, shop owner, etc.

    Attributes:
        seller_id: Unique identifier for the seller.
        user_id: Identifier for the user associated with the seller.
        selling_name: Name associated with selling activities.
        phone_number: Phone number of the seller.
        store_id: List of store IDs associated with the seller.
        email_id: Email address of the seller.
        rating: Rating of the seller.
    """

    seller_id: str
    user_id: str
    selling_name: str
    phone_number: str
    store_id: List[str]
    email_id: EmailStr
    rating: float

    @validator("seller_id", "user_id", "selling_name", pre=True, always=True)
    def validate_required_fields(cls, value):
        """
        Validator to ensure that all required fields (IDs, names) are always present.
        """
        if not value:
            raise ValueError(
                "seller_id, user_id, selling_name are required and cannot be empty for seller."
            )
        return value
    
class SellerRegistration(BaseModel):
    """
    Pydantic model representing the registration endpoint for sellers.

    Attributes:
        selling_name: Name associated with selling activities.
        email_id: Email address of the seller.
        phone_number: Phone number of the seller.
        gst_number: GST number of the seller.
        pan_number: PAN number of the seller.
        aadhaar_number: Aadhaar card information of the seller.
        seller_id: Unique identifier for the seller.
        user_id: Identifier for the user associated with the seller.
    """

    selling_name: str
    email_id: EmailStr
    phone_number: str
    gst_number: str
    pan_number: str
    aadhaar_number: str
    seller_id: str
    user_id: str

    @validator("selling_name", "gst_number", "pan_number", "aadhaar_number", "seller_id", "user_id", pre=True, always=True)
    def validate_required_fields(cls, value):
        """
        Validator to ensure that all required fields are always present.
        """
        if not value:
            raise ValueError(
                "selling_name, gst_number, pan_number, aadhaar_number, seller_id, user_id are required and cannot be empty for seller registration."
            )
        return value

class StoreRegistration(BaseModel):
    """
    Pydantic model representing the registration endpoint for stores.

    Attributes:
        seller_id: Identifier for the seller associated with the store.
        store_id: Unique identifier for the store.
        service_name: Name of the service associated with the store.
        store_name: Name of the store.
        store_phone_number: Phone number of the store.
        store_email_id: Email address of the store.
        pickup_address: Pickup address details including Area, Pincode, City, State.
        bank_account_name: Name associated with the bank account for the store.
        bank_account_no: Bank account number for the store.
        ifsc_code: IFSC code for the store's bank account.
        upi_id: UPI ID for the store.
        store_image: Image reference of the store.
        store_description: Description of the store.
        service_cat: List of categories offered by the store specifically.
    """

    seller_id: str
    store_id: str
    service_name: str
    store_name: str
    store_phone_number: str
    store_email_id: EmailStr
    pickup_address: str
    bank_account_name: str
    bank_account_no: str
    ifsc_code: str
    upi_id: str
    store_image: str
    store_description: str
    service_cat: List[str]

    @validator("seller_id", "store_id", "store_name", "bank_account_name", "bank_account_no", "ifsc_code", "upi_id", pre=True, always=True)
    def validate_required_fields(cls, value):
        """
        Validator to ensure that all required fields are always present.
        """
        if not value:
            raise ValueError(
                "seller_id, store_id, store_name, bank_account_name, bank_account_no, ifsc_code, upi_id are required and cannot be empty for store registration."
            )
        return value