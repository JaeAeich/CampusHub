import json
from unittest.mock import patch

def test_get_store_by_id(client):
    with patch("campus_hub.utils.db.db_connector.query_data") as mock_query_data:
        mock_query_data.return_value = [
            {
                "store_id": "store_123",
                "store_name": "Example Store",
                "location": "Example Location",
                "category": "Example Category",
            }
        ]

        response = client.get("campus_hub/v1/stores/store_123")
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "store" in data

    mock_query_data.assert_called_once_with("stores", {"store_id": "store_123"}, {"_id": False})

def test_get_trending_stores(client):
    with patch("campus_hub.utils.db.db_connector.query_data") as mock_query_data:
        mock_query_data.return_value = [
            {
                "store_id": "store_123",
                "store_name": "Example Store 1",
                "location": "Location 1",
                "category": "Category 1",
            },
            {
                "store_id": "store_456",
                "store_name": "Example Store 2",
                "location": "Location 2",
                "category": "Category 2",
            }
        ]

        response = client.get("campus_hub/v1/stores/trending")

    assert response.status_code == 200
    data = json.loads(response.data)
    assert "stores" in data

    mock_query_data.assert_called_once_with("stores", {}, {"_id": False})

def test_get_offers_by_store_id(client):
    with patch("campus_hub.utils.db.db_connector.query_data") as mock_query_data:
        mock_query_data.return_value = [
            {
                "offer_id": "offer_123",
                "store_id": "store_123",
                "offer_description": "Example Offer Description",
                "discount": 20,
            }
        ]

        response = client.get("campus_hub/v1/stores/store_123/offers")

    assert response.status_code == 200
    data = json.loads(response.data)
    assert "offers" in data

    mock_query_data.assert_called_once_with("offers", {"store_id": "store_123"}, {"_id": False})
def test_get_reviews_by_store_id(client):
    with patch("campus_hub.utils.db.db_connector.query_data") as mock_query_data:
        mock_query_data.return_value = [
            {
                "review_id": "review_123",
                "store_id": "store_123",
                "customer_id": "customer_123",
                "rating": 4.5,
                "comment": "Example review comment",
            }
        ]

        response = client.get("campus_hub/v1/stores/store_123/reviews")

    # Assertions
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "reviews" in data

    mock_query_data.assert_called_once_with("reviews", {"store_id": "store_123"}, {"_id": False})


def test_get_orders_by_store_id(client):
    with patch("campus_hub.utils.db.db_connector.query_data") as mock_query_data:
        mock_query_data.return_value = [
            {
                "order_id": "order_123",
                "store_id": "store_123",
                "customer_id": "customer_123",
                "total_price": 50.0,
                "status": "completed",

            }
        ]
        response = client.get("campus_hub/v1/stores/store_123/orders")
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "orders" in data

    mock_query_data.assert_called_once_with("orders", {"store_id": "store_123"}, {"_id": False})


def test_get_products_by_store_id(client):
    with patch("campus_hub.utils.db.db_connector.query_data") as mock_query_data:
        mock_query_data.return_value = [
            {
                "product_id": "product_123",
                "store_id": "store_123",
                "name": "Example Product",
                "price": 20.0,
                "description": "Example product description",
            }
        ]
        response = client.get("campus_hub/v1/stores/store_123/products")
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "products" in data

    mock_query_data.assert_called_once_with("products", {"store_id": "store_123"}, {"_id": False})
