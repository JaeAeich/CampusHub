from pydantic import BaseModel


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
