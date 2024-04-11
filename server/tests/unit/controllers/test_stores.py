import json
from unittest.mock import patch

def test_get_stores(client):
    # Mock the query_data function of db_connector
    with patch("campus_hub.utils.db.db_connector.query_data") as mock_query_data:
        # Mock the response from the query_data function
        mock_query_data.return_value = [
            {
                "store_id": "stores_123",
                "store_name": "Store 1",
                "store_address": "Address 1",
                "store_email": "store1@example.com",
                "store_phone_number": "1234567890",
                "seller_id": "sellers_4VZeW4AT5SSLHN8Zu5dq9C",
            },
            {
                "store_id": "stores_456",
                "store_name": "Store 2",
                "store_address": "Address 2",
                "store_email": "store2@example.com",
                "store_phone_number": "9876543210",
                "seller_id": "sellers_eN9i3GWWsm6R7nNNWnpdm3",
            },
        ]

        # Make the API call
        response = client.get("campus_hub/v1/stores")

    # Assertions
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "stores" in data

    mock_query_data.assert_called_once_with("stores", {}, {"_id": False})