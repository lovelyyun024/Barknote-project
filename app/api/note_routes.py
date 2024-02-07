from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Note, Tag
from app.forms import NoteForm
import json

note_routes = Blueprint('notes', __name__)

#    Query for all notes of current user and returns them in a list of note dictionaries
@note_routes.route('')
@login_required
def get_notes():
    notes = Note.query.filter_by(user_id=current_user.id)
    return {'notes': [note.to_dict(tags=True) for note in notes]}

#   Query for a note by id and return that note in a dictionary
@note_routes.route('/<int:id>')
@login_required
def get_notebook(id):
    note = Note.query.get(id)
    if not note or note.user_id != current_user.id:
        return {'message':'Note not found'}, 404
    return {'note': note.to_dict(tags=True)}


#   Create a new note
@note_routes.route('', methods=['POST'])
@login_required
def create_note():
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # pinnedCount= Note.query.filter_by(pinned=True, user_id=current_user.id).count()
    
    
    if form.validate_on_submit():
        data = form.data
        tags_str = data['tags']
        array_tags = json.loads(tags_str)
        # print("4444", array_tags)

        taglist = []

        for tag_id in array_tags:
            tag = Tag.query.get(tag_id)
            if tag:
                taglist.append(tag)

        note = Note(
            notebook_id = data['notebook_id'],
            user_id = current_user.id,
            title = data['title'],
            content = data['content'],
            img_url = data['img_url'],
            pinned = data['pinned'],
            tags = taglist
        )
        db.session.add(note)
        db.session.commit()
        return note.to_dict()
    return {'errors': form.errors}, 401

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

        tags_str = data['tags']
        array_tags = json.loads(tags_str)
        # print("4444", array_tags)

        taglist = []

        for tag_id in array_tags:
            tag = Tag.query.get(tag_id)
            if tag:
                taglist.append(tag)

        note.title = data['title']
        note.content = data['content']
        note.img_url = data['img_url']
        note.pinned = data['pinned']
        note.notebook_id = data['notebook_id']
        note.tags = taglist
        db.session.commit()
        return note.to_dict(tags=True)
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
