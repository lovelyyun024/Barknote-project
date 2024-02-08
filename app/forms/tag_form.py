from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Tag
from flask_login import current_user

def tag_exists(form, field):
    # Checking if tag exists
    name = field.data
    tag = Tag.query.filter((Tag.name == name) & (Tag.user_id == current_user.id)).first()
    if tag:
        raise ValidationError('Tag name is already in use.')

class TagForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), tag_exists])
