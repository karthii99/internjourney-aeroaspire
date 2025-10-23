from app import create_app, db
from app.models import User, Task
app = create_app()
with app.app_context():
    if not User.query.filter_by(username='admin').first():
        user = User(username='admin', password=User.generate_hash('password'))
        db.session.add(user)
        db.session.commit()
    # Add sample tasks
    task1 = Task(title="Sample Task 1", description="Demo task", user_id=1)
    task2 = Task(title="Sample Task 2", description="Another demo", user_id=1)
    db.session.add_all([task1, task2])
    db.session.commit()
