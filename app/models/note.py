from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from .note_tag import note_tags

class Note(db.Model):
    __tablename__ = 'notes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    notebook_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("notebooks.id")),nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")),nullable=False)
    title = db.Column(db.String, default="Untitled", nullable=False)
    content = db.Column(db.Text)
    img_url = db.Column(db.String)
    pinned = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())

    notebook = db.relationship("Notebook", back_populates="notes")
    user = db.relationship("User", back_populates="notes")

    tags = db.relationship(
        "Tag",
        secondary=note_tags,
        back_populates="notes"
    )

    def to_dict(self, tags=False):
        return_dict = {
            'id': self.id,
            'notebook_id': self.notebook_id,
            'user_id':self.user_id,
            'title': self.title,
            'content': self.content,
            'img_url': self.img_url,
            'pinned':self.pinned,
            'created_at':self.created_at
        }
        
        if tags:
            return_dict['tags'] = [tag.to_dict() for tag in self.tags]

        return return_dict 
