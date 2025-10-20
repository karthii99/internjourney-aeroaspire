# Flask Task API

Setup Flask project; define folder structure (app folder, routes, static etc.); basic “Hello world” route, Implement GET /tasks and POST /tasks with dummy in‑memory storage; test via Postman or curl

---

## **1. Project Folder Structure**
flask_app/
│
├── app/
│ ├── init.py 
│ ├── routes.py
├── run.py


---

## **2. Setup Flask Environment**

1. Create a virtual environment:

```bash
python -m venv venv
pip install FlaskcSS

2. feed the code:

```bash

3. Run the App:

```
python run.py

Server will start at: http://127.0.0.1:5000/

5. Test Endpoints (Postman / curl):

```

curl http://127.0.0.1:5000/


Response:

Hello, World!

GET all tasks:

curl http://127.0.0.1:5000/tasks


Response:

[
  {"id": 1, "title": "Learn Flask", "completed": false},
  {"id": 2, "title": "Integrate DB", "completed": true}
]

```

## **3.GALLERY:

![Screenshot 1](day-01\images\img1.png)

