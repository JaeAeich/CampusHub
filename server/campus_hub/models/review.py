from typing import List, Optional
from pydantic import BaseModel


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
