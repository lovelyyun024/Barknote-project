from app.models import db, Note, environment, SCHEMA
from sqlalchemy.sql import text
from .tags import tag1_user1, tag2_user1, tag1_user2, tag1_user3

def seed_notes():
    note1_notebook1_user1 = Note(notebook_id = 1, user_id =1, title='Test1', content="Test text1", img_url="https://st.depositphotos.com/2274151/4841/i/450/depositphotos_48410095-stock-photo-sample-blue-square-grungy-stamp.jpg")
    note2_notebook1_user1 = Note(notebook_id = 1, user_id =1, tags=[tag1_user1, tag2_user1])
    note1_notebook2_user1 = Note(notebook_id = 2, user_id =1, title='Test2', content="Test text2", tags=[tag1_user1])
    note1_notebook1_user2 = Note(notebook_id = 3, user_id =2, title='Test3', tags=[tag1_user2])
    note1_notebook2_user2 = Note(notebook_id = 4, user_id =2, title='Test4')
    note1_notebook1_user3 = Note(notebook_id = 5, user_id =3, title='Test5', content="Test text3", tags=[tag1_user3])

    notes = [note1_notebook1_user1, note2_notebook1_user1, note1_notebook2_user1,note1_notebook1_user2, note1_notebook2_user2, note1_notebook1_user3]

    [db.session.add(note) for note in notes]
    db.session.commit()

def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.note_tags RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM note_tags"))
        db.session.execute(text("DELETE FROM notes"))
        
    db.session.commit()   
