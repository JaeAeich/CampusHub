from flask import jsonify, request
from campus_hub.utils.db import db_connector
from campus_hub.utils.functions import parse_json


def get_services():
    """
    Returns a list of all services.
    """
    try:
        from campus_hub.utils.db import DBConnector

        db = DBConnector().db
        serviceCollection = db["services"]
    except Exception:
        return {"message": "Error connecting to database"}, 500

    cursor = serviceCollection.find({}, limit=10)
    services = {"data": list(cursor)}

    return parse_json(services), 200


def add_service():
    """
    Adds a new service to the database and checks if the service already exists.
    """
    try:
        from campus_hub.utils.db import DBConnector

        db = DBConnector().db
        serviceCollection = db["services"]
    except Exception:
        return {"message": "Error connecting to database"}, 500

    request_data = request.get_json()

    # TODO: Add validation for serviceModel
    service = request_data

    found = serviceCollection.find_one({"service_id": service["service_id"]})
    if found:
        return {"message": "Service already exists"}, 409

    try:
        serviceCollection.insert_one(service)
        return {"message": "Service added successfully"}
    except Exception:
        return {"message": "Error adding service"}, 500


def get_service_by_id(service_id):
    """
    Returns a service given its ID.
    """
    try:
        from campus_hub.utils.db import DBConnector

        db = DBConnector().db
        serviceCollection = db["services"]
    except Exception:
        return {"message": "Error connecting to database"}, 500

    cursor = serviceCollection.find_one({"service_id": service_id})
    if not cursor:
        return {"message": "Service not found"}, 404
    service = {"data": parse_json(cursor)}
    return service, 200


def update_service(service_id):
    """
    Updates a service in the database.
    Given a service ID, updates the service with the provided data.
    """
    try:
        from campus_hub.utils.db import DBConnector

        db = DBConnector().db
        serviceCollection = db["services"]
    except Exception:
        return {"message": "Error connecting to database"}, 500

    # TODO: Add validation for query and update
    query = {"service_id": service_id}
    update = {"$set": request.get_json()}

    try:
        cursor = serviceCollection.find_one_and_update(query, update)
        if not cursor:
            return {"message": "Service not found"}, 404
    except Exception:
        return {"message": "Error updating service"}, 500

    return {"message": "Service updated successfully"}, 200


def delete_service(service_id):
    """
    Deletes a service from the database.
    """
    try:
        from campus_hub.utils.db import DBConnector

        db = DBConnector().db
        serviceCollection = db["services"]
    except Exception:
        return {"message": "Error connecting to database"}, 500

    try:
        cursor = serviceCollection.delete_one({"service_id": service_id})
        if not cursor.deleted_count:
            return {"message": "Service not found"}, 404
    except Exception:
        return {"message": "Error deleting service"}, 500

    return {"message": "Service deleted successfully"}, 200


def get_stores_by_service_id(service_id):
    # Placeholder logic to get details of a specific service by ID
    return {"id": service_id, "name": "Service", "description": "Description"}


def update_store_by_service_id(service_id, request_data):
    # Placeholder logic to update a service by ID
    return {"message": "Service updated successfully"}


def delete_store_by_service_id(service_id):
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
