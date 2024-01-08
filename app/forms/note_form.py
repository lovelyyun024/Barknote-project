from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField, SelectField
from wtforms.validators import DataRequired
from app.models import Tag

class NoteForm(FlaskForm):
    def get_choices():
        tags =  Tag.query.all()
        tag_choices = [(str(tag.id), tag.name) for tag in tags]
        return tag_choices

    title = StringField('title')
    content = TextAreaField('content')
    img_url = StringField('img_url')
    pinned = BooleanField('pinned')
    # tags = SelectField('tag', choices=get_choices())
