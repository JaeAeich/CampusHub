from pathlib import Path
from connexion import FlaskApp
from connexion.resolver import RelativeResolver
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app = FlaskApp(
    __name__,
    specification_dir="specs",
    resolver=RelativeResolver("campus_hub.controllers"),
)
openapi_path = Path(__file__).parent / "specs" / "api.yaml"
app.add_api(openapi_path)


if __name__ == "__main__":
    # for development only
    app.run(port=8081, debug=True)
