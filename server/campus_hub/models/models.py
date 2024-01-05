from typing import List, Dict, Optional, Tuple
from pydantic import BaseModel, validator, EmailStr

class Service(BaseModel):
    """Pydantic model representing a service. A service represents
    a category of shops that can be offered by a campus, like food,
    laundry, etc.

    Attributes:
        service_id: Unique identifier for the service.
        store_ids: List of store IDs associated with the service.
        service_name: Name of the service.
        service_description: Description of the service.
        service_images: List of image references related to the service.
        service_categories: Categories associated with the service.
    """

    service_id: str
    store_ids: List[str]
    service_name: str
    service_description: str
    service_images: List[str]
    service_categories: Optional[List[str]] = None

    @validator(
        "service_id",
        "store_ids",
        "service_name",
        "service_images",
        "service_categories",
        pre=True,
        always=True,
    )
    def validate_required_fields(cls, value):
        """
        Validator to ensure that all required fields (service_id, store_ids, service_name, service_images, service_categories) are always present.
        """
        required_fields = ["service_id", "store_ids", "service_name", "service_images", "service_categories"]
        missing_fields = [field for field in required_fields if not value.get(field)]
        
        if missing_fields:
            raise ValueError(
                f"The following fields are required and cannot be empty for service: {', '.join(missing_fields)}"
            )
        
        return value

class Store(BaseModel):
    """
    Pydantic model representing a store. A store represents a shop
    that is associated with a service. For example, a store can be
    a restaurant that offers food service.

    Attributes:
        store_id: Unique identifier for the store.
        store_name: Name of the store.
        store_images: List of image references related to the store.
        store_description: Description of the store.
        store_categories: Categories associated with the store.
        store_phonenumber: Phone number associated with the store.
        store_email: Email associated with the store.
        product_ids: List of product IDs associated with the store.
        seller_id: Identifier for the seller associated with the store.
        service_id: Identifier for the service related to the store.
        coordinates: Coordinates representing the location of the store.
        store_address: Address of the store.
        stripe_public_key: Store's unique stripe key that can be published.
    """

    store_id: str
    store_name: str
    store_images: List[str]
    store_description: str
    store_phonenumber: float #added this field
    store_email: EmailStr #added this field
    store_categories: Optional[List[str]] = None 
    customer_order_ids:  Optional[List[str]] = None #added this field
    product_ids: List[str]
    seller_id: str
    service_id: str
    coordinates: Tuple[float, float]
    store_address: str
    stripe_public_key: str

    @validator(
    "store_id", "seller_id", "service_id", "store_phonenumber", "store_email", "store_name", "store_categories", "coordinates", "store_address", "stripe_public_key", "customer_order_ids",
    pre=True,
    always=True,
)
    def validate_required_fields(cls, value):
        """
        Validator to ensure that all required fields (store_id, seller_id, service_id, store_name, store_phonenumber, store_email, store_categories, coordinates, address, stripe_public_key, customer_order_ids) are always present.
        """
        required_fields = ["store_id", "seller_id", "service_id", "store_name", "store_categories", "coordinates", "store_address", "stripe_public_key", "store_phonenumber", "store_email" , "customer_order_ids"]
        missing_fields = [field for field in required_fields if not value.get(field)]
        
        if missing_fields:
            raise ValueError(
                f"The following fields are required and cannot be empty for store: {', '.join(missing_fields)}"
            )
        
        return value

class Product(BaseModel):
    """
    Pydantic model representing a product.

    Attributes:
        product_id: Unique identifier for the product.
        product_categories: List of categories associated with the product.
        product_name: Name of the product.
        store_id: Identifier for the store associated with the product.
        product_image: Image reference of the product.
        product_cost: Cost of the product.
        product_description: Description of the product.
        product_discount: Discount for the product.
        stock: Available quantity of the product.
        product_specifications: Dictionary of product specifications.
    """
    
    product_id: str
    product_categories: List[str] # Will retrieving products from a specific category be easy, if we use a list?
    product_name: str 
    store_id: str
    product_image: str
    product_cost: float
    product_discount: float
    product_description: str
    stock: float
    product_specifications: Dict

    @validator(
        "product_id",
        "product_categories",
        "product_name",
        "store_id",
        "product_cost",
        "stock",
        pre=True,
        always=True,
    )
    def validate_required_fields(cls, value):
        """
        Validator to ensure that all required fields (product_id, product_categories, product_name, store_id, product_cost, stock) are always present.
        """
        required_fields = ["product_id", "product_categories", "product_name", "store_id", "product_cost", "stock"]
        missing_fields = [field for field in required_fields if not value.get(field)]
        
        if missing_fields:
            raise ValueError(
                f"The following fields are required and cannot be empty for product: {', '.join(missing_fields)}"
            )
        
        return value

class Review(BaseModel):
    """
    Pydantic model representing a review.

    Attributes:
        comment: Review comment.
        user_id: User identifier.
        rating: Rating given in the review.
        review_images: Image references in the review.
    """

    comment: str #This being empty is fine right? What if users are too busy to comment, but only to give rate.
    user_id: str
    rating: float
    review_images: List[str]

    @validator("user_id", "rating", pre=True, always=True)
    def validate_required_fields(cls, value):
        """
        Validator to ensure that required fields (user_id, rating) are always present.
        """
        required_fields = ["user_id", "rating"]
        missing_fields = [field for field in required_fields if not value.get(field)]

        if missing_fields:
            raise ValueError(
                f"The following fields are required and cannot be empty for review: {', '.join(missing_fields)}"
            )

        return value

class Reviews(BaseModel):
    """
    Pydantic model representing a collection of reviews.

    Attributes:
        product_id: Identifier for the product associated with the reviews.
        reviews: List of reviews.
    """

    product_id: str
    reviews: Optional[List[Review]] = None 

    @validator("product_id", "reviews", pre=True, always=True)
    def validate_required_fields(cls, value):
        """
        Validator to ensure that required fields (product_id, reviews) are always present.
        """
        required_fields = ["product_id", "reviews"]
        missing_fields = [field for field in required_fields if not value.get(field)]

        if missing_fields:
            raise ValueError(
                f"The following fields are required and cannot be empty for reviews: {', '.join(missing_fields)}"
            )

        return value

class CartItem(BaseModel):
    """
    Pydantic model representing a cart item.

    Attributes:
        product_id: Identifier for the product in the cart.
        quantity: Quantity of the product in the cart.
        wishlisted_price: Wishlisted price for the product.
    """

    product_id: str
    quantity: float
    wishlisted_price: float

    @validator("product_id", "quantity", pre=True, always=True)
    def validate_required_fields(cls, value):
        """
        Validator to ensure that required fields (product_id, quantity) are always present.
        """
        required_fields = ["product_id", "quantity"]
        missing_fields = [field for field in required_fields if not value.get(field)]

        if missing_fields:
            raise ValueError(
                f"The following fields are required and cannot be empty for cart item: {', '.join(missing_fields)}"
            )

        return value

class Carts(BaseModel):
    """
    Pydantic model representing a collection of carts.

    Attributes:
        user_id: Identifier for the user associated with the carts.
        carts: List of carts.
    """

    user_id: str
    carts: Optional[List[str]] = None 

    @validator(
        "user_id",  "carts",
        pre=True,
        always=True,
    )
    def validate_user_id(cls, value):
        """
        Validator to ensure that user_id, carts is not empty.
        """
        if not value:
            raise ValueError("user_id and carts is required and cannot be empty for carts.")
        return value
    


class User(BaseModel):
    """
    Pydantic model representing a user.

    Attributes:
        user_id: Unique identifier for the user.
        user_name: Name of the user.
        user_phone_number: Phone number of the user.
        user_email: Email address of the user.
        order_ids: List of order IDs associated with the user.
        user_image: Image reference of the user.
        address: Address of the user.
    """

    user_id: str
    user_name: str
    user_phone_number: float
    user_email: EmailStr
    order_ids: Optional[List[str]] = None 
    user_image: str
    address: str
    @validator("user_id", "user_name", "user_phone_number", "user_email", "address", "order_ids", pre=True, always=True)
    def validate_required_fields(cls, value):
        """
        Validator to ensure that required fields (user_id, user_name, user_phone_number, user_email, address, order_ids) are always present.
        """
        required_fields = ["user_id", "user_name", "user_phone_number", "user_email", "address", "order_ids"]
        missing_fields = [field for field in required_fields if not value.get(field)]

        if missing_fields:
            raise ValueError(
                f"The following fields are required and cannot be empty for user: {', '.join(missing_fields)}"
            )

        return value

class Seller(User):
    """
    Pydantic model representing a seller, extending the User model.

    Attributes:
        seller_id: Identifier for the seller.
        store_ids: List of store IDs associated with the seller.
    """

    seller_name: str
    seller_phone_number: float
    seller_email: EmailStr
    seller_image: str
    address: str
    seller_id: str
    store_ids:  Optional[List[str]] = None 

    @validator("seller_name", "seller_phone_number", "seller_email", "seller_id", "store_ids", pre=True, always=True)
    def validate_required_fields(cls, value):
        """
        Validator to ensure that required fields (seller_name, seller_phone_number, seller_email, seller_id, store_ids) are always present.
        """
        required_fields = ["seller_name", "seller_phone_number", "seller_email", "seller_id", "store_ids"]
        missing_fields = [field for field in required_fields if not value.get(field)]

        if missing_fields:
            raise ValueError(
                f"The following fields are required and cannot be empty for seller: {', '.join(missing_fields)}"
            )

        return value

class Order(BaseModel):
    """
    Pydantic model representing an order.

    Attributes:
        order_id: Unique identifier for the order.
        user_id: Identifier for the user placing the order.
        product_list: List of cart items in the order.
        store_id: Identifier for the store associated with the order.
        order_status: Status of the order.
        amount_paid: Amount paid for the order.
        transaction_id: Identifier for the transaction related to the order.
        delivery_address: Address for delivering the order.
        seller_id: Identifier for the seller fulfilling the order.
    """

    order_id: str
    user_id: str
    product_list: List[CartItem]
    store_id: str
    order_status: str
    amount_paid: float
    transaction_id: str
    delivery_address: str
    seller_id: str

    @validator("order_id", "user_id", "product_list", "store_id", "order_status", "amount_paid", "transaction_id", "delivery_address", "seller_id", pre=True, always=True)
    def validate_required_fields(cls, value):
        """
        Validator to ensure that required fields (order_id, user_id, product_list, store_id, order_status, amount_paid, transaction_id, delivery_address, seller_id) are always present.
        """
        required_fields = ["order_id", "user_id", "product_list", "store_id", "order_status", "amount_paid", "transaction_id", "delivery_address", "seller_id"]
        missing_fields = [field for field in required_fields if not value.get(field)]

        if missing_fields:
            raise ValueError(
                f"The following fields are required and cannot be empty for order: {', '.join(missing_fields)}"
            )

        return value

class Payment(BaseModel):
    """
    Pydantic model representing a payment.

    Attributes:
        transaction_id: Identifier for the payment transaction.
        payment_mode: Mode of payment.
        amount: Amount paid.
        description: Description of the payment.
        source: Source of the payment.
        currency: Currency used for the payment.
        upi_id: UPI ID associated with the payment.
        payment_status: Status of the payment.
    """

    transaction_id: str
    payment_mode: str
    amount: float
    description: str
    source: str
    currency: str
    upi_id: str
    payment_status: str

    @validator("transaction_id", "payment_mode", "amount", "description", "source", "currency", "upi_id", "payment_status", pre=True, always=True)
    def validate_required_fields(cls, value):
        """
        Validator to ensure that required fields (transaction_id, payment_mode, amount, description, source, currency, upi_id, payment_status) are always present.
        """
        required_fields = ["transaction_id", "payment_mode", "amount", "description", "source", "currency", "upi_id", "payment_status"]
        missing_fields = [field for field in required_fields if not value.get(field)]

        if missing_fields:
            raise ValueError(
                f"The following fields are required and cannot be empty for payment: {', '.join(missing_fields)}"
            )

        return value
