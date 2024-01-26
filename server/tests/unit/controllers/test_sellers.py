import json
from unittest.mock import patch


def test_get_sellers(client):
    # Mock the query_data function of db_connector
    with patch("campus_hub.utils.db.db_connector.query_data") as mock_query_data:
        # Mock the response from the query_data function
        mock_query_data.return_value = [
            {
                "order_ids": ["string"],
                "seller_address": "string",
                "seller_email": "user@example.com",
                "seller_gender": "Male",
                "seller_id": "sellers_eN9i3GWWsm6R7nNNWnpdm3",
                "seller_image": "string",
                "seller_name": "string",
                "seller_phone_number": "string",
                "store_ids": ["string"],
            },
            {
                "order_ids": ["string"],
                "seller_address": "string",
                "seller_email": "user@example.com",
                "seller_gender": "Male",
                "seller_id": "sellers_4VZeW4AT5SSLHN8Zu5dq9C",
                "seller_image": "string",
                "seller_name": "string",
                "seller_phone_number": "string",
                "store_ids": ["string"],
            },
        ]

        # Make the API call
        response = client.get("campus_hub/v1/sellers")

    # Assertions
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "sellers" in data

    mock_query_data.assert_called_once_with("sellers", {}, {"_id": False})

    # Test Seller model
    with patch("campus_hub.utils.db.db_connector.query_data") as mock_query_data:
        # Mock the response from the query_data function with invalid data
        mock_query_data.return_value = [
            {
                "order_ids": ["string"],
                "seller_gender": "Male",
                "seller_id": "sellers_eN9i3GWWsm6R7nNNWnpdm3",
                "seller_name": "string",
                "seller_phone_number": "string",
                "store_ids": ["string"],
            },
            {
                "seller_email": "user@example.com",
                "seller_gender": "Male",
                "seller_id": "sellers_4VZeW4AT5SSLHN8Zu5dq9C",
                "seller_image": "string",
                "seller_name": "string",
                "seller_phone_number": "string",
                "store_ids": ["string"],
            },
        ]

        # Make the API call
        response = client.get("campus_hub/v1/sellers")

    # Assertions
    assert response.status_code == 500
