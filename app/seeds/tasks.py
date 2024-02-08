from app.models import db, Task, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_tasks():
    task1_user1 = Task(assigner_id = 1, description='Call vendor', due_date=datetime(2023, 2, 25, 15, 0, 0))
    task2_user1 = Task(assigner_id = 1, description='Dog grooming', completed=True)
    task3_user1 = Task(assigner_id = 1, description='Interview')
    task4_user1 = Task(assigner_id = 1, description='Cat grooming')
    task5_user1 = Task(assigner_id = 1, description='Print documents',due_date=datetime(2024, 12, 25, 9, 0, 0))
    task6_user1 = Task(assigner_id = 1, description='Q3 Presentation', completed=True)

    tasks = [task1_user1, task2_user1, task3_user1, task4_user1, task5_user1, task6_user1]

    [db.session.add(task) for task in tasks]
    db.session.commit()

def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))
        
    db.session.commit()   
