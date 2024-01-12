from flask import request
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
