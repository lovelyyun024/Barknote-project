from app.models import db, Notebook, environment, SCHEMA
from sqlalchemy.sql import text

def seed_notebooks():
    notebook1_user1 = Notebook(user_id = 1, title='My First Notebook')
    notebook2_user1 = Notebook(user_id = 1, title='My Second Notebook')
    notebook1_user2 = Notebook(user_id = 2, title='My 1st Notebook')
    notebook2_user2 = Notebook(user_id = 2, title='My 2st Notebook')
    notebook1_user3 = Notebook(user_id = 3, title='Default Notebook')
    
    notebooks = [notebook1_user1, notebook2_user1, notebook1_user2, notebook2_user2, notebook1_user3]

    [db.session.add(notebook) for notebook in notebooks]
    db.session.commit()

def undo_notebooks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notebooks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notebooks"))
        
    db.session.commit()   
