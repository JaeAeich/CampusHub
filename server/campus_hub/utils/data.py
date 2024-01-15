from typing import Type


def serialize_model(model: Type, data: dict) -> dict:
    """
    Serialize data using a Pydantic model.

    Args:
        model (Type): Pydantic model.
        data (dict): Data to be serialized.

    Returns:
        dict: Serialized data.
    """
    return model(**data).dict()
