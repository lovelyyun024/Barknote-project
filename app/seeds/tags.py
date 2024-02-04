from app.models import db, Tag, environment, SCHEMA
from sqlalchemy.sql import text

tag1_user1 = Tag(user_id = 1, name="personal")
tag2_user1 = Tag(user_id = 1, name="work")
tag1_user2 = Tag(user_id = 2, name="travel")
tag1_user3 = Tag(user_id = 3, name="daily routine")

tags = [tag1_user1, tag2_user1, tag1_user2, tag1_user3]

def seed_tags():
    [db.session.add(tag) for tag in tags]
    db.session.commit()

def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tags"))
        
    db.session.commit()   
