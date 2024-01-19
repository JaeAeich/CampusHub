from pathlib import Path
from connexion import FlaskApp
from connexion.resolver import RelativeResolver


def create_app():
    app = FlaskApp(
        __name__,
        specification_dir="specs",
        resolver=RelativeResolver("campus_hub.controllers"),
    )
    openapi_path = Path(__file__).parent / "specs" / "api.yaml"
    app.add_api(openapi_path)
    return app


app = create_app()

if __name__ == "__main__":
    # for development only
    app.run(port=8081, debug=True)
