import os
from pymongo import MongoClient


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

    def ping(self) -> bool:
        """
        Checks the connection status to the MongoDB server.

        Returns:
            bool: True if the connection is successful, False otherwise.
        """
        try:
            self.client.admin.command("ping")
            return True
        except Exception as e:
            print(f"Error pinging MongoDB: {e}")
            return False
