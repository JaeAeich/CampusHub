import json
import pytest
from campus_hub.app import create_app


@pytest.fixture
def app():
    app = create_app()
    return app.app


def test_add_seller(app):
    client = app.test_client()

    print(client)

    sample_seller_data = {
        "order_ids": ["string"],
        "seller_address": "string",
        "seller_email": "user@example.com",
        "seller_gender": "Male",
        "seller_image": "string",
        "seller_name": "string",
        "seller_phone_number": "string",
        "store_ids": ["string"],
    }

    response = client.post(
        "campus_hub/v1/sellers",
        data=json.dumps(sample_seller_data),
        content_type="application/json",
    )

    print("Response Status Code:", response.status_code)
    print("Response Data:", response.data)

    assert response.status_code == 200

    data = json.loads(response.data)
    assert "id" in data


def test_get_sellers(app):
    client = app.test_client()

    response = client.get("campus_hub/v1/sellers")
    assert response.status_code == 200

    data = json.loads(response.data)

    assert "sellers" in data
