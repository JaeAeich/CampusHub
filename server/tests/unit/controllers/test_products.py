import json
from unittest.mock import patch

def test_get_products(client):
    with patch("campus_hub.utils.db.db_connector.query_data") as mock_query_data:
        mock_query_data.return_value = [
            {
                "product_id": "product_123",
                "product_name": "Example Product",
                "product_cost": 10.99,
            }
        ]

        response = client.get("campus_hub/v1/products?service_id=service_123&store_id=store_456&max_rating=5&min_rating=4&category=electronics")
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "products" in data

    mock_query_data.assert_called_once_with("products", {
        "service_id": "service_123",
        "store_id": "store_456",
        "rating": {"$lte": 5, "$gte": 4},
        "category": {"$in": ["electronics"]}
    }, {"_id": False})


def test_get_reviews_by_product_id(client):
    with patch("campus_hub.utils.db.db_connector.query_data") as mock_query_data:
        
        mock_query_data.return_value = [
            {
                "review_id": "review_123",
                "rating": 4.5,
                "comment": "Example Review",
                
            }
        ]

        response = client.get("campus_hub/v1/products/product_123/reviews")

    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "reviews" in data

    mock_query_data.assert_called_once_with("reviews", {"product_id": "product_123"}, {"_id": False})


def test_get_product_cost(client):
    with patch("campus_hub.utils.db.db_connector.query_data") as mock_query_data:
        
        mock_query_data.return_value = [
            {
                "product_id": "product_123",
                "product_cost": 10.99,
                
            }
        ]

        response = client.get("campus_hub/v1/products/product_123/cost")

    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "cost" in data

    mock_query_data.assert_called_once_with("products", {"product_id": "product_123"})


def test_get_range_of_cost_in_store(client):
    with patch("campus_hub.utils.db.db_connector.db.products") as mock_products_collection:
        
        mock_find = mock_products_collection.find
        mock_find.return_value.sort.return_value.limit.return_value = [
            {"product_cost": 10.99},
            {"product_cost": 5.99}
        ]

        response = client.get("campus_hub/v1/products/range_of_cost?store_id=store_123")

    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "max_cost" in data
    assert "min_cost" in data

    mock_find.assert_called_once_with({"store_id": "store_123"})
    mock_find.return_value.sort.assert_called_once_with("product_cost", -1)
    mock_find.return_value.limit.assert_called_once_with(1)


def test_search_products(client):
    with patch("campus_hub.utils.db.db_connector.query_data") as mock_query_data:
        
        mock_query_data.return_value = [
            {
                "product_id": "product_123",
                "product_name": "Example Product",
                "product_cost": 10.99,
                
            }
        ]

        response = client.get("campus_hub/v1/products/search?str_query=example&service_id=service_123")

    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "products" in data

    mock_query_data.assert_called_once_with("products", {
        "product_name": {"$regex": "^example", "$options": "i"},
        "service_id": "service_123"
    }, {"_id": False})