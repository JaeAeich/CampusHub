from pydantic import BaseModel
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
    payment_id : str
    order_id : str
    signature: str
    amount: float
    created_at: str
