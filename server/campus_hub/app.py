import os
from pathlib import Path
from connexion import FlaskApp
from connexion.resolver import RelativeResolver
from flask_cors import CORS
from dotenv import load_dotenv
import socket

# Create a socket object
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Get local machine name
host = socket.gethostname()
port = 12345

# Bind to the port
server_socket.bind((host, port))

# Wait for client connection
server_socket.listen(5)

while True:
    # Establish connection with client
    client_socket, addr = server_socket.accept()
    print('Got connection from', addr)

    # Send a notification to the client
    message = "Hello! This is a push notification."
    client_socket.send(message.encode())

    # Close the connection
    client_socket.close()


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

# Use CORS_ORIGIN from environment variable
cors_origin = os.getenv("CORS_ORIGIN", "https://localhost:5173")
CORS(app.app, origin=[cors_origin])

if __name__ == "__main__":
    load_dotenv()
    # for development only
    app.run(port=8081, debug=True)
