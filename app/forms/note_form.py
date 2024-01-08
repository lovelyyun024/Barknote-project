from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField, SelectField
from wtforms.validators import DataRequired

class NoteForm(FlaskForm):
    title = StringField('title')
    context = TextAreaField('context')
    img_url = StringField('img_url')
    pinned = BooleanField('pinned')

    tags = SelectField('tag')
