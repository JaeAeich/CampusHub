import os
import logging
from pymongo import MongoClient
from pymongo.collection import Collection
from pymongo.errors import ConnectionFailure, PyMongoError
from werkzeug.exceptions import InternalServerError


class DBConnector:
    def __init__(self) -> None:
        """
        Initializes the DBConnector object and establishes a connection to MongoDB using the provided environment variables.
        """
        try:
            self.username = os.environ.get("MONGO_USERNAME", "root")
            self.password = os.environ.get("MONGO_PASSWORD", "password")
            self.db_name = os.environ.get("MONGO_DB_NAME", "campus_hub")
            self.url = os.environ.get("MONGO_URL", "mongodb://localhost:27017/")

            self.client = MongoClient(
                self.url, username=self.username, password=self.password
            )
            self.db = self.client[self.db_name]

        except ConnectionFailure as e:
            raise ConnectionError(f"Failed to connect to MongoDB: {e}")
        except PyMongoError as e:
            raise InternalServerError(f"Error initializing MongoDB connection: {e}")

        # Configure logging
        logging.basicConfig(level=logging.DEBUG)
        self.logger = logging.getLogger(__name__)

    def ping(self) -> bool:
        """
        Checks the connection status to the MongoDB server.

        Returns:
            bool: True if the connection is successful, False otherwise.
        """
        try:
            self.client.admin.command("ping")
            return True
        except ConnectionFailure as e:
            self.logger.error(f"Error pinging MongoDB: {e}")
            return False

    def close_connection(self) -> None:
        """
        Closes the connection to MongoDB.
        """
        try:
            self.client.close()
            self.logger.info("MongoDB connection closed.")
        except PyMongoError as e:
            self.logger.error(f"Error closing MongoDB connection: {e}")

    def insert_data(self, collection_name: str, data: dict) -> None:
        """
        Inserts data into the specified MongoDB collection.

        Args:
            collection_name (str): Name of the collection.
            data (dict): Data to be inserted.
        """
        try:
            collection = self.db[collection_name]
            # Ensure the collection exists; create it if not
            if not self.collection_exists(collection):
                self.create_collection(collection_name)
                self.logger.info(
                    f"Collection '{collection_name}' created successfully."
                )

            collection.insert_one(data)
            self.logger.info("Data inserted successfully.")
        except PyMongoError as e:
            self.logger.error(f"Error inserting data into MongoDB: {e}")
            raise InternalServerError("Failed to insert data into MongoDB")

    def collection_exists(self, collection: Collection) -> bool:
        """
        Checks if a collection exists in the MongoDB database.

        Args:
            collection (Collection): MongoDB collection object.

        Returns:
            bool: True if the collection exists, False otherwise.
        """
        return collection.name in self.db.list_collection_names()

    def create_collection(self, collection_name: str) -> None:
        """
        Creates a new collection in the MongoDB database.

        Args:
            collection_name (str): Name of the collection to be created.
        """
        try:
            self.db.create_collection(collection_name)
        except PyMongoError as e:
            self.logger.error(f"Error creating collection '{collection_name}': {e}")
            raise InternalServerError(
                f"Failed to create collection '{collection_name}'"
            )

    def query_data(self, collection_name: str, query: dict) -> list:
        """
        Queries data from the specified MongoDB collection.

        Args:
            collection_name (str): Name of the collection.
            query (dict): Query parameters.

        Returns:
            list: List of documents matching the query.
        """
        try:
            collection = self.db[collection_name]
            result = list(collection.find(query))
            return result
        except PyMongoError as e:
            self.logger.error(f"Error querying data from MongoDB: {e}")
            raise InternalServerError("Failed to query data from MongoDB")

    def update_data(self, collection_name: str, query: dict, update_data: dict) -> None:
        """
        Updates data in the specified MongoDB collection.

        Args:
            collection_name (str): Name of the collection.
            query (dict): Query parameters to identify the document(s) to update.
            update_data (dict): New data to be set.
        """
        try:
            collection = self.db[collection_name]
            collection.update_many(query, {"$set": update_data})
            self.logger.info("Data updated successfully.")
        except PyMongoError as e:
            self.logger.error(f"Error updating data in MongoDB: {e}")
            raise InternalServerError("Failed to update data in MongoDB")


db_connector = DBConnector()
