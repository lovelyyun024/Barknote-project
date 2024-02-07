from app.models import db, Task, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_tasks():
    task1_user1 = Task(assigner_id = 1, description='call mom', due_date=datetime(2023, 2, 25, 15, 0, 0))
    task2_user1 = Task(assigner_id = 1, description='dog grooming', completed=True)
    task1_user2 = Task(assigner_id = 1, description='interview')
    task2_user2 = Task(assigner_id = 1, description='cat grooming')
    task1_user3 = Task(assigner_id = 1, description='print documents')

    tasks = [task1_user1, task2_user1, task1_user2, task2_user2, task1_user3]

    [db.session.add(task) for task in tasks]
    db.session.commit()

def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))
        
    db.session.commit()   
