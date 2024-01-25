import json
import pytest
from tests.conftest import client

# def test_add_seller(client):

#     sample_seller_data = {
#         "order_ids": ["string"],
#         "seller_address": "string",
#         "seller_email": "user@example.com",
#         "seller_gender": "Male",
#         "seller_image": "string",
#         "seller_name": "string",
#         "seller_phone_number": "string",
#         "store_ids": ["string"],
#     }

#     response = client.post(
#         "campus_hub/v1/sellers",
#         data=json.dumps(sample_seller_data),
#         content_type="application/json",
#     )

#     print("Response Status Code:", response.status_code)
#     print("Response Data:", response.data)

#     assert response.status_code == 200

#     data = json.loads(response.data)
#     assert "id" in data


def test_get_sellers(client):
    response = client.get("campus_hub/v1/sellers")
    assert response.status_code == 200

    data = json.loads(response.data)

    assert "sellers" in data
