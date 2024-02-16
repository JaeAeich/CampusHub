import pytest
from campus_hub.models.payment import Payment
from pydantic import ValidationError

def test_payment_model():
    # Create a valid payment
    payment_data = {
        "payment_id": "123456789",
        "amount": 100.0,
        "order_id": "Test payment",
        "signature": "Test source",
        "created_at": "today",
    }
    payment = Payment(**payment_data)

    assert payment.payment_id == "123456789"
    assert payment.created_at == "today"
    assert payment.amount == 100.0
    assert payment.order_id == "Test payment"
    assert payment.signature == "Test source"

    # Create a payment with invalid data
    invalid_data = {
        "payment_id": "123456789",
        "amount": "100.0",
        "order_id": "Test payment",
        "signature": "Test source",
        "created_at": "today",
    }
    # Check for a validationerror
    with pytest.raises(ValidationError):
        Payment(**invalid_data)

if __name__ == "__main__":
    pytest.main()
