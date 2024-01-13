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
    error = {
        "error": {
            "status_code": status_code,
            "type": error_type,
            "message": message,
            "details": details,
        }
    }
    return jsonify(error), status_code
