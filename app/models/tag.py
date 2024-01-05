from .db import db, environment, SCHEMA, add_prefix_for_prod
from .note_tag import note_tags

class Tag(db.Model):
    __tablename__ = 'tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String, nullable=False)

    user = db.relationship("User", back_populates="tags")
    notes = db.relationship(
        "Note",
        secondary=note_tags,
        back_populates="tags"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
        }
