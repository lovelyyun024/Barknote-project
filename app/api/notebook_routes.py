from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Notebook, Tag
from app.forms import NotebookForm

notebook_routes = Blueprint('notebooks', __name__)

#    Query for all notebooks of current user and returns them in a list of notebook dictionaries
@notebook_routes.route('/current')
@login_required
def get_notebooks():
    notebooks = Notebook.query.filter_by(user_id=current_user.id)
    return {'notebooks': [notebook.to_dict(note=True, user=True) for notebook in notebooks]}

#   Query for a notebook by id and return that notebook in a dictionary
@notebook_routes.route('/<int:id>')
@login_required
def get_notebook(id):
    notebook = Notebook.query.get(id)

    if not notebook or notebook.user_id != current_user.id:
        return jsonify(message='Notebook not found'), 404

    return notebook.to_dict(note=True, user=True)

#   Create a new notebook
@notebook_routes.route('/new', methods=['POST'])
@login_required
def create_notebook():
    form = NotebookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        notebook = Notebook(
            user_id = current_user.id,
            title = data['title']
        )
        db.session.add(notebook)
        db.session.commit()
        return notebook.to_dict(user=True)
    return {'errors': form.errors}, 401

#   Update a new notebook
@notebook_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_notebook(id):
    form = NotebookForm()
    notebook = Notebook.query.get(id)
    
    if not notebook:
        return {'errors': {'message': 'Notebook not found'}}, 404
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit() and notebook.user_id == current_user.id:
        data = form.data
        notebook.title = data['title']
        db.session.commit()
        return notebook.to_dict(user=True)
    elif not form.validate_on_submit():
        return {'errors': form.errors}, 401
    return {'errors': {'message': 'Unauthorized'}}, 403

#   delete a notebook
@notebook_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_notebook(id):
    notebook = Notebook.query.get(id)
    if not notebook or notebook.user_id != current_user.id:
        return {'errors': {'message': 'Notebook not found'}}, 404

    db.session.delete(notebook)
    db.session.commit()
    return {'message':'Notebook deleted successfully'}
