from flask import Flask
from flask_cors import CORS
from flasgger import Swagger

def create_app():
    app = Flask(__name__)
    CORS(app, origins=["http://localhost:3000"])  # allow React access
    Swagger(app)  # enable Swagger docs at /apidocs

    from .route import routes_v1
    app.register_blueprint(routes_v1)

    return app
