import os
import logging
import shortuuid
from pymongo import MongoClient
from pymongo.collection import Collection
from pymongo.errors import ConnectionFailure, PyMongoError
from werkzeug.exceptions import InternalServerError
from campus_hub.utils.response import response


class DBConnector:
    def __init__(self) -> None:
        """
        Initializes the DBConnector object and establishes a connection to MongoDB using the provided environment variables.
        """
        self.username: str = os.environ.get("MONGO_USERNAME", "root")
        self.password: str = os.environ.get("MONGO_PASSWORD", "password")
        self.db_name: str = os.environ.get("MONGO_DB_NAME", "campus_hub")
        self.url: str = os.environ.get("MONGO_URL", "mongodb://localhost:27017/")

        self.client: MongoClient = MongoClient(
            self.url, username=self.username, password=self.password
        )
        self.db = self.client[self.db_name]

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
        except ConnectionFailure:
            self.logger.error(
                response(500, "Error(DBConnector.ping) connecting to Mongo client")
            )
            return False

    def close_connection(self) -> None:
        """
        Closes the connection to MongoDB.
        """
        try:
            self.client.close()  # type: ignore[operator]
            self.logger.info("MongoDB connection closed.")
        except PyMongoError:
            self.logger.error(
                response(
                    500, "Error(DBConnector.close_connection) closing mongo connection."
                )
            )

    def get_collection(self, collection_name: str) -> Collection:
        """
        Get or create a MongoDB collection.

        Args:
            collection_name (str): Name of the collection.

        Returns:
            Collection: MongoDB collection object.
        """
        return self.client[self.db_name][collection_name]

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
            self.logger.error(
                response(
                    500,
                    "Error(DBConnector.insert_data) inserting data to Mongo collection.",
                ),
                e,
            )
            raise InternalServerError("Failed to insert data into MongoDB")

    def generate_unique_id(self, collection_name: str) -> str:
        """
        Generate a unique ID (UUID).

        Args:
            collection_name: Name of the collection this uuid will
            be used in.

        Returns:
            str: Unique ID.
        """
        try:
            id = collection_name + "-" + str(shortuuid.uuid())
            return id
        except Exception as e:
            self.logger.error(
                response(
                    500, "Error(DBConnector.generate_unique_id) generating unique id."
                ),
                e,
            )
            raise InternalServerError("Failed to generate unique id")

    def collection_exists(self, collection: Collection) -> bool:
        """
        Checks if a collection exists in the MongoDB database.

        Args:
            collection (Collection): MongoDB collection object.

        Returns:
            bool: True if the collection exists, False otherwise.
        """
        try:
            return collection.name in self.db.list_collection_names()  # type: ignore[operator]
        except PyMongoError as e:
            self.logger.error(
                response(
                    500,
                    "Error(DBConnector.collection_exists) checking if collection exists.",
                ),
                e,
            )
            raise InternalServerError("Failed to check if collection exists")

    def create_collection(self, collection_name: str) -> None:
        """
             Creates a new collection in the MongoDB database.

             Args:
                 collection_name (str): Name of the collection to be created.
        `"""
        try:
            self.db.create_collection(collection_name)  # type: ignore[operator]
        except PyMongoError as e:
            self.logger.error(
                response(
                    500,
                    f"Error(DBConnector.create_collection) creating {collection_name} collection.",
                ),
                e,
            )
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
            self.logger.error(
                response(
                    500, "Error(DBConnector.query_data) querying data from MongoDB."
                ),
                e,
            )
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

            # Check if the document(s) to update exist
            if collection.count_documents(query) == 0:
                raise LookupError("No matching records found for the update")

            # Update the data
            collection.update_many(query, {"$set": update_data})
            self.logger.info("Data updated successfully.")
        except PyMongoError as e:
            self.logger.error(
                response(500, "Error(DBConnector.update_data) updating data."), e
            )
            raise InternalServerError("Failed to update data in MongoDB")

    def delete_data(self, collection_name: str, query: dict) -> None:
        """
        Deletes data from the specified MongoDB collection.

        Args:
            collection_name (str): Name of the collection.
            query (dict): Query parameters to identify the document(s) to delete.
        """
        try:
            collection = self.db[collection_name]

            # Check if the document(s) to delete exist
            if collection.count_documents(query) == 0:
                raise LookupError("No matching records found to delete")

            collection.delete_many(query)
            self.logger.info("Data deleted successfully.")
        except PyMongoError as e:
            self.logger.error(
                response(500, "Error(DBConnector.delete_data) deleting data."), e
            )
            raise InternalServerError("Failed to delete data in MongoDB")


db_connector = DBConnector()
