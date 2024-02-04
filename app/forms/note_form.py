from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField, FieldList, FormField
from wtforms.validators import DataRequired, ValidationError
from app.models import Tag, Note
from flask_login import current_user

# def pinned_count(form, field):
#     # print(">>>>>>",current_user.id)
#     pinned = field.data
#     pinnedCount= Note.query.filter_by(pinned=True, user_id=current_user.id).count()
#     # print('####',pinned)
#     if pinnedCount >= 3 and pinned == True:
#         # print('-----')
#         raise ValidationError("Maximum pinned notes limit reached (3). Unpin other notes if needed.")

# class TagForm(FlaskForm):
#     tags = StringField('tags') 

class NoteForm(FlaskForm):
    # def get_choices():
    #     tags =  Tag.query.all()
    #     tag_choices = [(str(tag.id), tag.name) for tag in tags]
    #     return tag_choices

    title = StringField('title')
    content = TextAreaField('content')
    img_url = StringField('img_url')
    pinned = BooleanField('pinned')
    notebook_id = StringField('title', validators=[DataRequired()])
    tags =  (StringField('tags'))
