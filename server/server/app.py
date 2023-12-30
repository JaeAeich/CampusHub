from pathlib import Path
from connexion import App
from server.controller.hello import hello  # Add this line to import the hello function

app = App(__name__, specification_dir="./specs/")
app.add_api("openapi.yaml", base_path=Path(__file__).parent)

if __name__ == "__main__":
    app.run(port=8081)
