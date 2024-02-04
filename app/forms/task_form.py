from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, BooleanField
from wtforms.validators import DataRequired

class TaskForm(FlaskForm):
    description = StringField('description', validators=[DataRequired()])
    due_date = DateTimeField('due_date')
    completed = BooleanField('completed')
    
