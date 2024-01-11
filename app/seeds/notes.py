from app.models import db, Note, environment, SCHEMA
from sqlalchemy.sql import text
from .tags import tag1_user1, tag2_user1, tag1_user2, tag1_user3

def seed_notes():
    note1_notebook1_user1 = Note(notebook_id = 1, user_id =1, title='Test1', content="As I wandered through the lush green forest, I was mesmerized by the symphony of nature. The rustling leaves under my feet echoed the harmony of the wind, and the gentle murmur of a nearby stream added a soothing melody to the surroundings. Sunlight filtered through the thick foliage, creating a play of light and shadow. The vibrant colors of wildflowers painted a picturesque scene that seemed to be straight out of a dream. Nature's beauty captivated my senses, and I couldn't help but marvel at the intricate details of every leaf and petal. It was a reminder of the importance of preserving these serene landscapes for future generations to cherish.", img_url="https://st.depositphotos.com/2274151/4841/i/450/depositphotos_48410095-stock-photo-sample-blue-square-grungy-stamp.jpg")
    note2_notebook1_user1 = Note(notebook_id = 1, user_id =1, title='Test6', tags=[tag1_user1, tag2_user1])
    note1_notebook2_user1 = Note(notebook_id = 2, user_id =1, title='Test2', content="Creativity is a force that resides within each of us, waiting to be unleashed. It is a boundless ocean of ideas and expressions, ever-flowing and ever-changing. As I sat in my favorite corner, surrounded by blank canvases and scattered brushes, I felt the surge of inspiration enveloping me. Each stroke of the brush was a dance between imagination and reality, bringing to life the vivid scenes playing in my mind. The creative process is a journey of self-discovery, a way to explore the depths of one's thoughts and emotions. It is not confined to the realms of art but extends to every facet of life, shaping our perspectives and enriching our experiences.", tags=[tag1_user1])
    note1_notebook1_user2 = Note(notebook_id = 3, user_id =2, title='Test3', tags=[tag1_user2])
    note1_notebook2_user2 = Note(notebook_id = 4, user_id =2, title='Test4')
    note1_notebook1_user3 = Note(notebook_id = 5, user_id =3, title='Test5', content="Embarking on a culinary adventure is like stepping into a world of flavors and aromas. In my kitchen, I experimented with diverse ingredients, transforming simple recipes into culinary masterpieces. The sizzle of vegetables in a hot pan, the aroma of spices melding together, and the savoring of the final dish – it's a sensory journey that transcends the ordinary. Each ingredient tells a story, and every recipe is an opportunity to create something extraordinary. Cooking is more than a routine; it's an art form that allows me to express my creativity. From exotic spices to local produce, the kitchen becomes a canvas, and the plate, a masterpiece to be shared and savored.", tags=[tag1_user3])

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
