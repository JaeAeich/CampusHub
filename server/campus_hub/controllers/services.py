from flask import jsonify, request
from campus_hub.utils.db import db_connector


def get_services():
    # Placeholder logic to get a list of available services
    return [
        {"id": 1, "name": "Service 1", "description": "Description 1"},
        {"id": 2, "name": "Service 2", "description": "Description 2"},
    ]


def add_service():
    """
    Adds a new service to the MongoDB database.

    Returns:
        Flask response: JSON response containing the status of the operation.
    """
    try:
        # Assuming there is a collection named "services" in your MongoDB database.
        services_collection_name = "services"
        service_data = request.get_json()

        db_connector.insert_data(services_collection_name, service_data)

        return jsonify({"message": "service added successfully"}), 201

    except Exception as e:
        print(f"Error adding service to MongoDB: {e}")
        return jsonify({"error": "Internal Server Error"}), 500


def get_service_by_id(service_id):
    # Placeholder logic to get details of a specific service by ID
    return {"id": service_id, "name": "Service", "description": "Description"}


def update_service(service_id, request_data):
    # Placeholder logic to update a service by ID
    return {"message": "Service updated successfully"}


def delete_service(service_id):
    # Placeholder logic to delete a service by ID
    return {"message": "Service deleted successfully"}


def get_stores_by_service_id(service_id):
    # Placeholder logic to get details of a specific service by ID
    return {"id": service_id, "name": "Service", "description": "Description"}


def update_store_by_service_id(service_id, request_data):
    # Placeholder logic to update a service by ID
    return {"message": "Service updated successfully"}


def delete_store_by_service_id(service_id):
    # Placeholder logic to delete a service by ID
    return {"message": "Service deleted successfully"}


def get_products_by_service_id(service_id):
    # Placeholder logic to get details of a specific service by ID
    return {"id": service_id, "name": "Service", "description": "Description"}


def add_store_by_service_id(service_id):
    """
    Adds a new offer to the MongoDB database.

    Args:
        service_id (str): ID of the service to which the store belongs.

    Returns:
        Flask response: JSON response containing the status of the operation.
    """
    try:
        # Assuming there is a collection named "service", "stores" in your MongoDB database.
        services_collection_name = "services"
        stores_collection_name = "stores"
        store_data = request.get_json()

        # Check if the service with the specified service_id exists
        service_query = {"service_id": service_id}
        existing_service = db_connector.query_data(
            services_collection_name, service_query
        )

        if not existing_service:
            return jsonify(
                {"error": f"Service with service_id {service_id} not found"}
            ), 404

        store_data["service_id"] = service_id

        db_connector.insert_data(stores_collection_name, store_data)

        return jsonify({"message": "Store added successfully"}), 201

    except Exception as e:
        print(f"Error adding offer to MongoDB: {e}")
        return jsonify({"error": "Internal Server Error"}), 500
