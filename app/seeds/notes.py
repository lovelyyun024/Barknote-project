from app.models import db, Note, environment, SCHEMA
from sqlalchemy.sql import text
from .tags import tag1_user1, tag2_user1, tag1_user2, tag1_user3

def seed_notes():
    note1_notebook1_user1 = Note(notebook_id = 1, user_id =1, pinned=True, tags=[tag1_user1, tag2_user1], title='Starting a Healthy Lifestyle', content="Embarking on a fitness journey has been transformative. Setting daily workout goals, planning nutritious meals, and diligently tracking progress have become integral. Incorporating a variety of exercises, from cardio to strength training, keeps the routine engaging. A supportive community and fitness apps contribute to motivation. The journey isn't just physical; it's about fostering a holistic approach to well-being. As milestones are achieved, the commitment to a healthy lifestyle solidifies, creating a positive ripple effect on overall health and vitality.")
    note2_notebook1_user1 = Note(notebook_id = 1, user_id =1, pinned=True, tags=[tag1_user1], title='Language Learning Adventure', content="The language learning adventure in Spanish has been both challenging and rewarding. Daily practice routines include vocabulary drills, language apps, and conversational sessions with native speakers. Progress milestones, such as mastering common phrases and basic grammar rules, fuel motivation. Exploring Spanish literature and movies enhances cultural understanding. While fluency is the ultimate goal, the journey itself has broadened horizons and provided insights into the richness of language diversity.")
    note3_notebook1_user1 = Note(notebook_id = 1, user_id =1, tags=[tag2_user1], title='Dream Destinations', content="Creating a travel bucket list has opened the door to dream destinations. From the serene beaches of Bora Bora to the historical wonders of Machu Picchu, each destination represents a unique adventure. Researching travel itineraries, cultural highlights, and local cuisine adds excitement. The list is not just a catalog of places to visit but a roadmap for enriching experiences and creating lasting memories. With each checked-off destination, the travel bucket list becomes a tangible record of exploration and a source of inspiration for future adventures.")

    note1_notebook2_user1 = Note(notebook_id = 2, user_id =1, title='Innovative Mobile App Concept', content="Features, user interface sketches, and potential technologies.")
    note2_notebook2_user1 = Note(notebook_id = 2, user_id =1, title='Eco-Friendly Lifestyle Ideas', content="Tips for reducing carbon footprint, eco-friendly products, and sustainable practices.")
    note3_notebook2_user1 = Note(notebook_id = 2, user_id =1, title='Building Stronger Communities', content="Ideas for community events, collaboration strategies, and impact assessment.")

    note1_notebook3_user1 = Note(notebook_id = 3, user_id =1, title='Must-Read Novels', content="List of favorite fiction books, brief reviews, and reading goals.")
    note2_notebook3_user1 = Note(notebook_id = 3, user_id =1, title='Exploring the Tech World', content="Recommended books on science, technology, and innovation.")
    note3_notebook3_user1 = Note(notebook_id = 3, user_id =1, title='Mind-Enriching Reads', content="Books on self-improvement, motivation, and personal growth.")

    note1_notebook4_user1 = Note(notebook_id = 4, user_id =1, title='Digital Marketing Strategy', content="Campaign goals, target audience analysis, and content ideas.")
    note2_notebook4_user1 = Note(notebook_id = 4, user_id =1, title='Revamping Online Presence', content="Redesign concepts, user experience improvements, and development roadmap.")
    note3_notebook4_user1 = Note(notebook_id = 4, user_id =1, title='Q3 Performance Analysis', content="Sales reports, key performance indicators, and strategies for improvement.")

    note1_notebook5_user1 = Note(notebook_id = 5, user_id =1, title='Bali Bliss', content="Bali, the Island of the Gods, enchanted with vibrant streets, cultural richness in Ubud, and iconic locations like Uluwatu Temple. The Tegallalang Rice Terraces and Monkey Forest added to the allure. Sampling local cuisine, from Nasi Goreng to Babi Guling, was a culinary journey. Serenity extended to the Gili Islands, where crystal-clear waters and marine life awaited. Bali was more than a vacation; it was a journey of self-discovery.")
    note2_notebook5_user1 = Note(notebook_id = 5, user_id =1, title='Backpacking Across Europe', content="Backpacking across Europe began in Paris, embraced the Swiss Alps, explored Italian art in Florence and Rome, delved into Prague's history, and experienced Berlin's vibrant energy. The journey continued through Amsterdam's canals and concluded in Barcelona with Gaudí's architectural wonders. Beyond landmarks, interactions with fellow travelers and locals enriched the journey.")

    note1_notebook6_user2 = Note(notebook_id = 6, user_id =2, title='Test4')
    note1_notebook7_user3 = Note(notebook_id = 7, user_id =3, title='Test5', content="Embarking on a culinary adventure is like stepping into a world of flavors and aromas. In my kitchen, I experimented with diverse ingredients, transforming simple recipes into culinary masterpieces. The sizzle of vegetables in a hot pan, the aroma of spices melding together, and the savoring of the final dish – it's a sensory journey that transcends the ordinary. Each ingredient tells a story, and every recipe is an opportunity to create something extraordinary. Cooking is more than a routine; it's an art form that allows me to express my creativity. From exotic spices to local produce, the kitchen becomes a canvas, and the plate, a masterpiece to be shared and savored.")

    notes = [note1_notebook1_user1, note2_notebook1_user1, note3_notebook1_user1, note1_notebook2_user1,note2_notebook2_user1,note3_notebook2_user1,note1_notebook3_user1,note2_notebook3_user1, note3_notebook3_user1, note1_notebook4_user1, note2_notebook4_user1, note3_notebook4_user1, note1_notebook5_user1, note2_notebook5_user1, note1_notebook6_user2, note1_notebook7_user3 ]

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
