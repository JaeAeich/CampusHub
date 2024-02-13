import pytest
from campus_hub.models.user import User
from pydantic import ValidationError

def test_user_model():
    # Create a valid user
    user_data = {
        "user_id": "123456789",
        "user_name": "John Doe",
        "user_phone_number": "+1234567890",
        "user_email": "john@example.com",
        "user_gender": "Male",
        "order_ids": ["order1", "order2"],
        "user_address": "123 Main St, City",
        "cart_id": "cart123",
        "wishlist_cart_id": "wishlist123"
    }
    user = User(**user_data)

    assert user.user_id == "123456789"
    assert user.user_name == "John Doe"
    assert user.user_phone_number == "+1234567890"
    assert user.user_email == "john@example.com"
    assert user.user_gender == "Male"
    assert user.order_ids == ["order1", "order2"]
    assert user.user_address == "123 Main St, City"
    assert user.cart_id == "cart123"
    assert user.wishlist_cart_id == "wishlist123"

    # Create a user with invalid data
    invalid_data = {
        "user_id": "987654321",
        "user_name": "Jane Doe",
        "user_phone_number": "+9876543210",
        "user_email": "jane@example.com",
        "user_gender": "Invalid",
        "order_ids": ["order3", "order4"],
        "user_address": "456 Elm St, Town",
        "cart_id": "cart456",
        "wishlist_cart_id": "wishlist456"
    }
    # Check that creating with invalid gender raises a ValidationError
    with pytest.raises(ValidationError):
        User(**invalid_data)

if __name__ == "__main__":
    pytest.main()
