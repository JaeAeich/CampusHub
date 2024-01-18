from typing import Dict, Union, Any
from enum import Enum
from flask import jsonify, Response

Response = Dict[str, Union[int, str]]

ResponseID = Dict[str, str]

class Status(Enum):
    SUCCESS = 200
    BAD_REQUEST = 400
    NOT_FOUND = 404
    INTERNAL_SERVER_ERROR = 500

def response(status: Status, **Kwargs) -> tuple[Response, Status]:
    """
    Create a response object.

    Args:
        status (Status): Status of the response.
        **Kwargs: Keyword arguments to be included in the response.

    Returns:
        Flask response: JSON response containing the status of the operation.
    """
    return jsonify({
        **Kwargs,
    }), status.value