import requests
import os


def get_distance_matrix(origin, destination):
    """
    Get the distance matrix from DistanceMatrix.ai API
    :param origin: origin address
    :param destination: destination address
    :param key: API key
    """

    key = os.environ.get('DISTANCE_MATRIX_API_KEY')
    url = os.environ.get('DISTANCE_MATRIX_API_URL')

    params = {
        'origin': origin,
        'destination': destination,
        'key': key
    }

    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()  
