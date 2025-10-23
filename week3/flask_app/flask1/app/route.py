from flask import Blueprint, request, jsonify
from .models import User, Task
from . import db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flasgger import swag_from
from datetime import datetime

routes_v1 = Blueprint('routes_v1', __name__)

def create_default_user():
    if not User.query.filter_by(username='admin').first():
        user = User(username='admin', password=User.generate_hash('password'))
        db.session.add(user)
        db.session.commit()

# LOGIN
@routes_v1.route('/login', methods=['POST'])
@swag_from({
    'tags': ['Authentication'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'username': {'type': 'string'},
                    'password': {'type': 'string'}
                },
                'required': ['username', 'password']
            }
        }
    ],
    'responses': {
        200: {'description': 'Successful login'},
        400: {'description': 'Missing username/password'},
        401: {'description': 'Invalid credentials'}
    }
})
def login():
    data = request.get_json()
    if not data or "username" not in data or "password" not in data:
        return jsonify({"error": "Username and password required"}), 400

    user = User.query.filter_by(username=data["username"]).first()
    if not user or not User.verify_hash(data["password"], user.password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(identity=user.id)
    return jsonify({"access_token": token}), 200

# GET TASKS
@routes_v1.route('/tasks', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['Tasks'],
    'parameters': [
        {'name': 'status', 'in': 'query', 'type': 'string'},
        {'name': 'due_date', 'in': 'query', 'type': 'string'},
        {'name': 'search', 'in': 'query', 'type': 'string'},
        {'name': 'page', 'in': 'query', 'type': 'integer'},
        {'name': 'per_page', 'in': 'query', 'type': 'integer'}
    ],
    'responses': {200: {'description': 'List of tasks'}},
    'security': [{'Bearer': []}]
})
def get_tasks():
    user_id = get_jwt_identity()
    query = Task.query.filter_by(user_id=user_id)

    # Filters
    status = request.args.get('status')
    if status: query = query.filter_by(status=status)
    due_date = request.args.get('due_date')
    if due_date:
        try:
            due_date_obj = datetime.strptime(due_date, "%Y-%m-%d")
            query = query.filter(Task.due_date == due_date_obj)
        except ValueError:
            return jsonify({"error": "Invalid due_date format. Use YYYY-MM-DD"}), 400

    search = request.args.get('search')
    if search: query = query.filter(Task.title.ilike(f"%{search}%"))

    # Pagination
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))
    tasks_paginated = query.order_by(Task.created_at.desc()).paginate(page=page, per_page=per_page, error_out=False)

    tasks_list = [{
        "id": t.id,
        "title": t.title,
        "description": t.description,
        "status": t.status,
        "due_date": t.due_date.strftime("%Y-%m-%d") if t.due_date else None
    } for t in tasks_paginated.items]

    return jsonify({
        "tasks": tasks_list,
        "total": tasks_paginated.total,
        "pages": tasks_paginated.pages,
        "current_page": tasks_paginated.page
    })

# CREATE TASK
@routes_v1.route('/tasks', methods=['POST'])
@jwt_required()
@swag_from({
    'tags': ['Tasks'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'title': {'type': 'string'},
                    'description': {'type': 'string'},
                    'status': {'type': 'string'},
                    'due_date': {'type': 'string'}
                },
                'required': ['title']
            }
        }
    ],
    'responses': {201: {'description': 'Task created'}},
    'security': [{'Bearer': []}]
})
def create_task():
    data = request.get_json()
    user_id = get_jwt_identity()
    task = Task(
        title=data.get('title'),
        description=data.get('description'),
        status=data.get('status', 'pending'),
        due_date=datetime.strptime(data['due_date'], "%Y-%m-%d") if data.get('due_date') else None,
        user_id=user_id
    )
    db.session.add(task)
    db.session.commit()
    return jsonify({"msg": "Task created", "task_id": task.id}), 201

# UPDATE TASK
@routes_v1.route('/tasks/<int:task_id>', methods=['PUT'])
@jwt_required()
@swag_from({'tags': ['Tasks'], 'security': [{'Bearer': []}]})
def update_task(task_id):
    data = request.get_json()
    task = Task.query.get(task_id)
    if not task: return jsonify({"error": "Task not found"}), 404
    if "title" in data: task.title = data["title"]
    if "description" in data: task.description = data["description"]
    if "status" in data: task.status = data["status"]
    if "due_date" in data: task.due_date = datetime.strptime(data['due_date'], "%Y-%m-%d")
    db.session.commit()
    return jsonify({"msg": "Task updated"}), 200

# DELETE TASK
@routes_v1.route('/tasks/<int:task_id>', methods=['DELETE'])
@jwt_required()
@swag_from({'tags': ['Tasks'], 'security': [{'Bearer': []}]})
def delete_task(task_id):
    task = Task.query.get(task_id)
    if not task: return jsonify({"error": "Task not found"}), 404
    db.session.delete(task)
    db.session.commit()
    return jsonify({"msg": "Task deleted"}), 200
