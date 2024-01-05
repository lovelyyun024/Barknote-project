from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Notebook

notebook_routes = Blueprint('notebook', __name__)


@notebook_routes.route('/')
@login_required
def notebooks():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    notebooks = Notebook.query.all()
    return {'notebooks': [notebook.to_dict() for notebook in notebooks]}


@notebook_routes.route('/<int:id>')
@login_required
def notebook(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    notebook = Notebook.query.get(id)
    return notebook.to_dict()
