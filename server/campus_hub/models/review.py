from typing import List, Optional
from pydantic import BaseModel, validator


class Review(BaseModel):
    """
    Pydantic model representing a review.

    Attributes:
        comment_headline: Headline of comment
        comment: Comment body.
        user_id: User identifier.
        rating: Rating given in the review.
        review_images: Image references in the review.
    """

    comment_headline = str
    comment: Optional[str]
    user_id: str
    rating: float
    review_images: List[str]

    @validator("user_id", "rating", "comment_headline", pre=True, always=True)
    def validate_required_fields(cls, value):
        """
        Validator to ensure that required fields (user_id, rating, comment_headline) are always present.
        """
        required_fields = ["user_id", "rating", "comment_headline"]
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
        store_id: The ID of the store
        product_id: Identifier for the product associated with the reviews.
        reviews: List of reviews.
    """

    store_id: str
    product_id: str
    reviews: List[Review]

    @validator("product_id", "reviews", "store_id", pre=True, always=True)
    def validate_required_fields(cls, value):
        """
        Validator to ensure that required fields (product_id, reviews, store_id) are always present.
        """
        required_fields = ["product_id", "reviews", "store_id"]
        missing_fields = [field for field in required_fields if not value.get(field)]

        if missing_fields:
            raise ValueError(
                f"The following fields are required and cannot be empty for reviews: {', '.join(missing_fields)}"
            )

        return value
