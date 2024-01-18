from werkzeug.exceptions import InternalServerError, BadRequest, Forbidden, NotFound


class ProductNotFound(NotFound):
    """Exception raised when a requested product is not found."""

    def __init__(self, product_id):
        super().__init__(f"Product with ID {product_id} not found.")


class InsufficientStock(BadRequest):
    """Exception raised when there is insufficient stock for a product."""

    def __init__(self, product_id):
        super().__init__(f"Insufficient stock for product with ID {product_id}.")


class UnauthorizedAccess(Forbidden):
    """Exception raised when a user tries to access a resource without proper authorization."""

    def __init__(self, user_id):
        super().__init__(f"Unauthorized access for user with ID {user_id}.")


class PaymentError(InternalServerError):
    """Exception raised when a payment processing error occurs."""

    def __init__(self, order_id):
        super().__init__(
            f"Payment processing error for order with ID {order_id}. Please try again later."
        )


class InvalidData(BadRequest):
    """Exception raised when incoming data fails Pydantic validation."""

    def __init__(self, details):
        super().__init__(f"Invalid data. Details: {details}")


class DBConnectionError(InternalServerError):
    """Exception raised when there is an error connecting to the database."""

    def __init__(self):
        super().__init__("Error connecting to the database.")


class DBQueryError(InternalServerError):
    """Exception raised when there is an error querying data from the database."""

    def __init__(self, details):
        super().__init__(f"Error querying data from the database. Details: {details}")


class DBInsertionError(InternalServerError):
    """Exception raised when there is an error inserting data into the database."""

    def __init__(self, details):
        super().__init__(f"Error inserting data into the database. Details: {details}")


class DBUpdateError(InternalServerError):
    """Exception raised when there is an error updating data in the database."""

    def __init__(self, details):
        super().__init__(f"Error updating data in the database. Details: {details}")


class DBDeletionError(InternalServerError):
    """Exception raised when there is an error deleting data from the database."""

    def __init__(self, details):
        super().__init__(f"Error deleting data from the database. Details: {details}")


class UniqueIDGenerationError(InternalServerError):
    """Exception raised when there is an error generating a unique ID."""

    def __init__(self):
        super().__init__("Error generating a unique ID.")


class CollectionCreationError(InternalServerError):
    """Exception raised when there is an error creating a new collection in the database."""

    def __init__(self, collection_name):
        super().__init__(f"Error creating collection '{collection_name}'.")


class CollectionNotFoundError(NotFound):
    """Exception raised when a requested collection is not found in the database."""

    def __init__(self, collection_name):
        super().__init__(f"Collection '{collection_name}' not found.")


class CollectionExistsError(InternalServerError):
    """Exception raised when trying to create a collection that already exists."""

    def __init__(self, collection_name):
        super().__init__(f"Collection '{collection_name}' already exists.")


class CollectionDeletionError(InternalServerError):
    """Exception raised when there is an error deleting a collection from the database."""

    def __init__(self, collection_name):
        super().__init__(f"Error deleting collection '{collection_name}'.")


class InconsistentDBData(Exception):
    """Exception raised when there is inconsistent data in the database."""

    def __init__(self, collection_name):
        super().__init__(f"Inconsistent data in '{collection_name}' collection.")
