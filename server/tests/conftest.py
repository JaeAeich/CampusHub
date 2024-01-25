import pytest
from campus_hub.app import app

@pytest.fixture
def client():
    """Configures the app for testing

    Sets app config variable ``TESTING`` to ``True``

    :return: App for testing
    """

    app.app.config['TESTING'] = True
    client = app.app.test_client()

    yield client