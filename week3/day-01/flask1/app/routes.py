from flask import jsonify, request
from app import app

tasks = [
    {"id": 1, "title": "Learn Flask", "done": False},
    {"id": 2, "title": "integrate db", "done": True}
]

@app.route('/')
def home():
    return "Hello, World!"

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    if not data or 'title' not in data:
        return jsonify({"error": "Title is required"}), 400

    new_task = {
        "id": len(tasks) + 1,
        "title": data['title'],
        "done": True
    }
    tasks.append(new_task)
    return jsonify(new_task), 201
