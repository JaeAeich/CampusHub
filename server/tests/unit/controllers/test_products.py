from unittest.mock import patch
import json

# def test_get_products(client):
#     with patch("campus_hub.utils.db.db_connector.query_data") as mock_query_data:
#         # Mock the response from the query_data function
#         mock_query_data.return_value = [
#             {
#                 "product_id": "product_123",
#                 "product_name": "Example Product",
#                 "product_cost": 10.99,
#             }
#         ]

#         # Make the API call
#         response = client.get("/campus_hub/v1/products?service_id=service_123&store_id=store_456&max_rating=5&min_rating=4&category=electronics")

#     # Assertions
#     assert response.status_code == 200
#     data = json.loads(response.data)
#     assert "products" in data

#     mock_query_data.assert_called_once_with("products", {
#         "service_id": "service_123",
#         "store_id": "store_456",
#         "max_rating": 5,
#         "min_rating": 4,
#         "category": ["electronics"]
#     }, {"_id": False})

def test_get_products_no_results(client):
    with patch("campus_hub.utils.db.db_connector.query_data") as mock_query_data:
        # Mock the response from the query_data function to return empty list
        mock_query_data.return_value = []

        # Make the API call
        response = client.get("/campus_hub/v1/products?service_id=service_123&store_id=store_456&max_rating=5&min_rating=4&category=electronics")

    # Assertions
    assert response.status_code == 404
    data = json.loads(response.data)
    assert data["message"] == "No products found in the database."

def test_get_products_error(client):
    with patch("campus_hub.utils.db.db_connector.query_data") as mock_query_data:
        # Mock an exception being raised by query_data function
        mock_query_data.side_effect = Exception("Database connection error")

        # Make the API call
        response = client.get("/campus_hub/v1/products?service_id=service_123&store_id=store_456&max_rating=5&min_rating=4&category=electronics")

    # Assertions
    assert response.status_code == 500
    data = json.loads(response.data)
    assert data["message"] == "Error retrieving product from MongoDB: Database connection error"
