import requests
import os
from typing import Tuple, Dict


def get_distance_matrix(origin: Tuple[float, float], destination: Tuple[float, float]):
    """
    Get the distance matrix from DistanceMatrix.ai API
    :param origin: origin address
    :param destination: destination address
    :param key: API key
    """

    key: str = os.environ.get('DISTANCE_MATRIX_API_KEY', 'your_key')
    url: str = os.environ.get('DISTANCE_MATRIX_API_URL', 'https://api.distancematrix.ai/maps/api/distancematrix/json')

    params: Dict[str, str | Tuple[float, float]] = {
        'origin': origin,
        'destination': destination,
        'key': key
    }

    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()  
