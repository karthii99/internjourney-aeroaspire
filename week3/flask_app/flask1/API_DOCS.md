# Task Manager API (v1)

Base URL: `http://127.0.0.1:5000/api/v1`

---

## Endpoints

### GET /tasks
Retrieve all tasks or filter by completion.

**Example:**  
`GET /api/v1/tasks?completed=true`

**Response:**
```json
[
  {"id":1,"title":"Learn Flask","done":false}
]
