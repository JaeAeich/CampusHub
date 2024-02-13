import pytest
from campus_hub.models.payment import Payment
from pydantic import ValidationError

def test_payment_model():
    # Create a valid payment
    payment_data = {
        "transaction_id": "123456789",
        "payment_mode": "UPI",
        "amount": 100.0,
        "description": "Test payment",
        "source": "Test source",
        "currency": "USD",
        "upi_id": "test@upi",
        "payment_status": "UPI"
    }
    payment = Payment(**payment_data)

    assert payment.transaction_id == "123456789"
    assert payment.payment_mode == "UPI"
    assert payment.amount == 100.0
    assert payment.description == "Test payment"
    assert payment.source == "Test source"
    assert payment.currency == "USD"
    assert payment.upi_id == "test@upi"
    assert payment.payment_status == "UPI"

    # Create a payment with invalid data
    invalid_data = {
        "transaction_id": "987654321",
        "payment_mode": "COD",
        "amount": 50.0,
        "description": "Invalid payment",
        "source": "Invalid source",
        "currency": "XYZ",  #wrong currency
        "upi_id": "invalid@upi",
        "payment_status": "COD"
    }
    # Check for a validationerror
    with pytest.raises(ValidationError):
        Payment(**invalid_data)

if __name__ == "__main__":
    pytest.main()
