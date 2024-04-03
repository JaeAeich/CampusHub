import os
from pathlib import Path
from connexion import FlaskApp
from connexion.resolver import RelativeResolver
from flask_cors import CORS
from dotenv import load_dotenv
from flask_socketio import SocketIO
from flask import request

def create_app():
    app = FlaskApp(
        __name__,
        specification_dir="specs",
        resolver=RelativeResolver("campus_hub.controllers"),
    )
    openapi_path = Path(__file__).parent / "specs" / "api.yaml"
    app.add_api(openapi_path)
    return app

# Define the socketio object before using @socketio.on() decorators
socketio = SocketIO(cors_allowed_origins="*")

# POST on /notification endpoint 
@socketio.on('send_notif')
def send_notification():
    _from = request.json.get('from')
    _to = request.json.get('to')
    message = request.json.get('message')
    print("###############")
    print(_to)
    print(_from)
    print(message)
    print("###############")
    socketio.emit(f"receive_notification_{_to}", {'message': {
        'from': _from,
        'message': message
    }}, room= _to)
    print(f"Notification sent to {_to}")
    return {'message': f"Notification sent to {_to}"}

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

app = create_app()

# Initialize socketio with the Flask app
socketio.init_app(app.app)

# Use CORS_ORIGIN from environment variable
cors_origin = os.getenv("CORS_ORIGIN", "https://localhost:5173")
CORS(app.app)

if __name__ == "__main__":
    load_dotenv()
    # for development only
    socketio.run(app.app, port=8081, debug=True)
