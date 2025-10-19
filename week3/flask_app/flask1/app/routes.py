from flask import request, jsonify
from app import app

# Dummy in-memory storage
tasks = [
    {"id": 1, "title": "Learn Flask", "completed": False},
    {"id": 2, "title": "Integrate DB", "completed": True}
]

# Helper to get task by id
def get_task(task_id):
    return next((task for task in tasks if task["id"] == task_id), None)

# --- Routes ---

@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/tasks", methods=["GET"])
def get_tasks():
    completed = request.args.get("completed")
    if completed is not None:
        completed_bool = completed.lower() == "true"
        filtered_tasks = [task for task in tasks if task["completed"] == completed_bool]
        return jsonify(filtered_tasks)
    return jsonify(tasks)

@app.route("/tasks", methods=["POST"])
def create_task():
    data = request.get_json()
    if not data or "title" not in data:
        return jsonify({"error": "Title is required"}), 400
    
    new_task = {
        "id": max(task["id"] for task in tasks) + 1 if tasks else 1,
        "title": data["title"],
        "completed": data.get("completed", False)
    }
    tasks.append(new_task)
    return jsonify(new_task), 201

@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    task = get_task(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404
    
    data = request.get_json()
    task["title"] = data.get("title", task["title"])
    if "completed" in data:
        task["completed"] = data["completed"]
    return jsonify(task)

@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    task = get_task(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404
    tasks.remove(task)
    return jsonify({"message": "Task deleted"})
