from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Note
from app.forms import NoteForm

note_routes = Blueprint('notes', __name__)

#    Query for all notes of current user and returns them in a list of note dictionaries
@note_routes.route('')
@login_required
def get_notes():
    notes = Note.query.filter_by(user_id=current_user.id)
    return {'notes': [note.to_dict() for note in notes]}

#   Query for a note by id and return that note in a dictionary
@note_routes.route('/<int:id>')
@login_required
def get_notebook(id):
    note = Note.query.get(id)
    if not note or note.user_id != current_user.id:
        return {'message':'Note not found'}, 404
    return note.to_dict()

#   Update a new note
@note_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_note(id):
    form = NoteForm()
    note = Note.query.get(id)
    
    if not note:
        return {'errors': {'message': 'Note not found'}}, 404
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit() and note.user_id == current_user.id:
        data = form.data
        note.title = data['title']
        note.content = data['content']
        note.img_url = data['img_url']
        note.pinned = data['pinned']
        db.session.commit()
        return note.to_dict()
    elif not form.validate_on_submit():
        return {'errors': form.errors}, 401
    return {'errors': {'message': 'Unauthorized'}}, 403

#   delete a note
@note_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_note(id):
    note = Note.query.get(id)
    if not note or note.user_id != current_user.id:
        return {'errors': {'message': 'Note not found'}}, 404

    db.session.delete(note)
    db.session.commit()
    return {'message':'Note deleted successfully'}
