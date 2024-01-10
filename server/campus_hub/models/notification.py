from pydantic import BaseModel, validator


class Notification(BaseModel):
    """
    Pydantic model representing a payment.

    Attributes:
        recipient_id: The id of the seller/buyer
        message: The message to be sent
        seen_status: Seen status
    """

    recipient_id: str
    message: str
    seen_status: bool = False

    @validator(
        "recipient_id",
        "message",
        pre=True,
        always=True,
    )
    def validate_required_fields(cls, value):
        """
        Validator to ensure that required fields (recipient_id, message) are always present.
        """
        required_fields = ["recipient_id", "message"]
        missing_fields = [field for field in required_fields if not value.get(field)]

        if missing_fields:
            raise ValueError(
                f"The following fields are required and cannot be empty for payment: {', '.join(missing_fields)}"
            )

        return value
