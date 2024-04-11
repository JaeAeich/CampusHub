import unittest
import json
from unittest.mock import patch, MagicMock
from campus_hub.utils.response import APIResponse
from campus_hub.stores import get_store_by_id

class TestGetStoreById(unittest.TestCase):
    @patch('campus_hub.utils.db.db_connector.get_store_by_id')
    def test_get_store_by_id(self, mock_get_store_by_id):
        # Arrange
        mock_store = {"store_id": "123", "name": "Test Store"}
        mock_get_store_by_id.return_value = mock_store

        # Act
        response = get_store_by_id("123")

        # Assert
        assert response.status_code == 200
        data = json.loads(response.data)
        assert "stores" in data
        self.assertIsInstance(response, APIResponse)
        self.assertEqual(response.data, mock_store)

if __name__ == '__main__':
    unittest.main()
