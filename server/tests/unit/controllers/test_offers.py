import json
from unittest.mock import patch

def test_delete_offer(client):
    with patch("campus_hub.utils.db.db_connector.delete_data") as mock_delete_data:
        # Mock the delete_data function
        mock_delete_data.return_value = None

        # Make the API call
        response = client.delete("campus_hub/v1/offers/offer_123")

    # Assertions
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "id" in data

    mock_delete_data.assert_called_once_with("offers", {"offer_id": "offer_123"})