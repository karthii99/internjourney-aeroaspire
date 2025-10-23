from flask import Flask, app
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flasgger import Swagger
from flask_cors import CORS
from flask_migrate import Migrate
migrate = Migrate()
db = SQLAlchemy()
jwt = JWTManager()
migrate.init_app(app, db)
swagger_template = {
    "swagger": "2.0",
    "info": {
        "title": "Task Manager API",
        "description": "API for managing tasks",
        "version": "1.0.0"
    },
    "securityDefinitions": {
        "Bearer": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header",
            "description": "JWT Authorization header using the Bearer scheme. Example: 'Bearer {token}'"
        }
    },
    "security": [{"Bearer": []}]
}

def create_app():
    app = Flask(__name__)
    
    app.config['SECRET_KEY'] = 'supersecretkey'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'

    db.init_app(app)
    jwt.init_app(app)
    CORS(app)
    Swagger(app, template=swagger_template)

    with app.app_context():
        from .models import User, Task
        from .route import routes_v1, create_default_user
        db.create_all()
        create_default_user()

    app.register_blueprint(routes_v1, url_prefix="/api/v1")
    return app
