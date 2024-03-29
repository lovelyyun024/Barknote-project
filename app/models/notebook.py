from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Notebook(db.Model):
    __tablename__ = 'notebooks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")),nullable=False)
    title = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())

    user = db.relationship("User", back_populates="notebooks")
    notes = db.relationship("Note", back_populates="notebook", cascade="all, delete")


    def to_dict(self, notes=False, user=False):
        return_dict = {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'created_at':self.created_at
        }

        if notes:
            return_dict['notes']=[note.to_dict() for note in self.notes]

        if user:
            return_dict['user']= self.user.to_dict_user()

        return return_dict
