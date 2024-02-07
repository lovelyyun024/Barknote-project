from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    img_url = db.Column(db.String, default="https://barkbook-bucket.s3.us-west-2.amazonaws.com/demouser+icon.png")

    notebooks = db.relationship("Notebook", back_populates="user", cascade="all, delete")
    notes = db.relationship("Note", back_populates="user", cascade="all, delete")
    tags = db.relationship("Tag", back_populates="user", cascade="all, delete")
    
    assingers = db.relationship("Task", foreign_keys='Task.assigner_id', back_populates="user_assigner", cascade="all, delete" )
    assignees = db.relationship("Task", foreign_keys='Task.assignee_id', back_populates="user_assignee", cascade="all, delete" )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        if password == 'OAUTH':
            self.hashed_password = 'OAUTH' 
            return
        else:
            self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'img_url': self.img_url
        }
    
    def to_dict_user(self):
        return self.username
        
