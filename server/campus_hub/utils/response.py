from typing import Dict, Union

Response = Dict[str, Union[int, str]]


def response(status_code: int, message: str) -> Response:
    """
    Create a response object.

    Args:
        status_code (int): HTTP status code.
        message (str): User-friendly message.

    Returns:
        str: JSON-formatted response object.
    """
    return {
        "status_code": status_code,
        "message": message,
    }
