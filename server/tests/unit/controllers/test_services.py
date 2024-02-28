import json
from unittest.mock import patch

# def test_get_services(client):
#     with patch("campus_hub.utils.db.db_connector.query_data") as mock_query_data:

#         mock_query_data.return_value = [
#             {
#                 "service_id": "service_123",
#                 "name": "Example Service",
#                 "description": "Example Description",

#             }
#         ]


#         response = client.get("campus_hub/v1/services")


#     assert response.status_code == 200
#     data = json.loads(response.data)
#     assert "services" in data

#     mock_query_data.assert_called_once_with("services", {}, {"_id": False})


# def test_add_service(client):
#     # Mocking the request.json
#     request_data = {
#         "name": "Example Service",
#         "description": "Example Description",
        
#     }

#     with patch("campus_hub.utils.db.db_connector.generate_unique_id") as mock_generate_unique_id, \
#          patch("campus_hub.utils.db.db_connector.insert_data") as mock_insert_data:
        
#         mock_generate_unique_id.return_value = "service_123"
        

#         response = client.post("campus_hub/v1/services", json=request_data)


#     assert response.status_code == 200
#     data = json.loads(response.data)
#     assert "id" in data

#     mock_generate_unique_id.assert_called_once_with("services")
#     mock_insert_data.assert_called_once_with("services", {
#         "service_id": "service_123",
#         "name": "Example Service",
#         "description": "Example Description",
        
#     })


# def test_update_service(client):
#     # Mocking the request.json
#     request_data = {
#         "service_id": "service_123",
#         "name": "Updated Service",
#         "description": "Updated Description",
        
#     }

#     with patch("campus_hub.utils.db.db_connector.update_data") as mock_update_data:
        

#         response = client.put("campus_hub/v1/services/service_123", json=request_data)


#     assert response.status_code == 200
#     data = json.loads(response.data)
#     assert "id" in data

#     mock_update_data.assert_called_once_with("services", {"service_id": "service_123"}, {
#         "service_id": "service_123",
#         "name": "Updated Service",
#         "description": "Updated Description",
        
#     })


def test_delete_service(client):
    with patch("campus_hub.utils.db.db_connector.delete_data") as mock_delete_data:
        

        response = client.delete("campus_hub/v1/services/service_123")


    assert response.status_code == 200
    data = json.loads(response.data)
    assert "id" in data

    mock_delete_data.assert_called_once_with("services", {"service_id": "service_123"})


# def test_get_stores_by_service_id(client):
#     with patch("campus_hub.utils.db.db_connector.query_data") as mock_query_data:

#         mock_query_data.return_value = [
#             {
#                 "store_id": "store_123",
#                 "store_name": "Example Store",

#             }
#         ]


#         response = client.get("campus_hub/v1/services/service_123/stores")


#     assert response.status_code == 200
#     data = json.loads(response.data)
#     assert "stores" in data

#     mock_query_data.assert_called_once_with("services", {"service_id": "service_123"}, {"_id": False})


# def test_get_offers_by_service_id(client):
#     with patch("campus_hub.utils.db.db_connector.query_data") as mock_query_data:

#         mock_query_data.return_value = [
#             {
#                 "offer_id": "offer_123",
#                 "offer_description": "Example Offer Description",

#             }
#         ]


#         response = client.get("campus_hub/v1/services/service_123/offers")


#     assert response.status_code == 200
#     data = json.loads(response.data)
#     assert "offers" in data

#     mock_query_data.assert_called_once_with("offers", {"service_id": "service_123"}, {"_id": False})
