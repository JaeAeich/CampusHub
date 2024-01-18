from enum import Enum
from flask import jsonify, Response
from typing import Any, Dict


class Status(Enum):
    SUCCESS = 200
    BAD_REQUEST = 400
    NOT_FOUND = 404
    INTERNAL_SERVER_ERROR = 500


APIResponse = tuple[Response, int]
APIMessage = Dict[str, Any]


def response(status: Status, **Kwargs) -> APIResponse:
    """
    Create a response object.

    Args:
        status (Status): Status of the response.
        **Kwargs: Keyword arguments to be included in the response.

    Returns:
        Flask response: JSON response containing the status of the operation.
    """
    return jsonify(
        {
            **Kwargs,
        }
    ), status.value


def message(message: str) -> APIMessage:
    """
    Generate a JSON response with a given message.
    """
    return {
        "message": message,
    }
