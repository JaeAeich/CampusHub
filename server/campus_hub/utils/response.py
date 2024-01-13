from flask import jsonify


def error(status_code, error_type, message, details=None):
    """
    Create a JSON error response.

    Args:
        status_code (int): HTTP status code.
        error_type (str): Short error type or code (NotFound, ServerError ...).
        message (str): User-friendly error message.
        details (dict): Additional information for developers (optional).

    Returns:
        Flask response: JSON error response.
    """
    error_response = {
        "error": {
            "state": "Not OK",
            "status_code": status_code,
            "type": error_type,
            "message": message,
            "details": details,
        }
    }
    return jsonify(error_response), status_code


def info(status_code, message, details=None):
    """
    Create a JSON response for informational messages.

    Args:
        status_code (int): HTTP status code.
        message (str): User-friendly message.
        details (dict): Additional information for developers (optional).

    Returns:
        Flask response: JSON response.
    """
    info_response = {
        "info": {
            "status": "OK",
            "status_code": status_code,
            "message": message,
            "details": details,
        }
    }
    return jsonify(info_response), status_code
