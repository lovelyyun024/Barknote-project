from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Task(db.Model):
    __tablename__ = 'tasks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    assigner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    assignee_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    description = db.Column(db.String, nullable=False)
    due_date= db.Column(db.DateTime)
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())

    user_assigner = db.relationship("User", foreign_keys=[assigner_id], back_populates="assingers")
    user_assignee = db.relationship("User", foreign_keys=[assignee_id], back_populates="assignees")

    def to_dict(self):
        return {
            'id': self.id,
            'assigner_id': self.assigner_id,
            'assignee_id': self.assignee_id,
            'description': self.description,
            'due_date': self.due_date,
            'completed': self.completed,
            'created_at':self.created_at
        }
