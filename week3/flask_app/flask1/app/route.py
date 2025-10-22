from flask import Blueprint, jsonify, request

routes_v1 = Blueprint("routes_v1", __name__, url_prefix="/api/v1")

# In-memory task list
tasks = [
    {"id": 1, "title": "Learn Flask", "done": False},
    {"id": 2, "title": "Integrate React", "done": True}
]

# ---------------------------
# GET /tasks
# ---------------------------
@routes_v1.route("/tasks", methods=["GET"])
def get_tasks():
    completed = request.args.get("completed")
    filtered = tasks
    if completed is not None:
        completed = completed.lower() == "true"
        filtered = [t for t in tasks if t["done"] == completed]
    return jsonify(filtered), 200

# ---------------------------
# POST /tasks
# ---------------------------
@routes_v1.route("/tasks", methods=["POST"])
def create_task():
    data = request.get_json()
    if not data or "title" not in data or not data["title"].strip():
        return jsonify({"error": "Title is required"}), 400

    new_task = {
        "id": len(tasks) + 1,
        "title": data["title"],
        "done": False
    }
    tasks.append(new_task)
    return jsonify(new_task), 201

# ---------------------------
# PUT /tasks/<id>
# ---------------------------
@routes_v1.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    data = request.get_json()
    task = next((t for t in tasks if t["id"] == task_id), None)
    if not task:
        return jsonify({"error": "Task not found"}), 404

    if "title" in data:
        task["title"] = data["title"]
    if "done" in data:
        task["done"] = bool(data["done"])

    return jsonify(task), 200

# ---------------------------
# DELETE /tasks/<id>
# ---------------------------
@routes_v1.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    global tasks
    tasks = [t for t in tasks if t["id"] != task_id]
    return jsonify({"message": "Task deleted"}), 200

# ---------------------------
# Error Handlers
# ---------------------------
@routes_v1.app_errorhandler(404)
def not_found(error):
    return jsonify({"error": "Resource not found"}), 404

@routes_v1.app_errorhandler(400)
def bad_request(error):
    return jsonify({"error": "Bad request"}), 400
