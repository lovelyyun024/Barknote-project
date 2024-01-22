from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Tag
from app.forms import TagForm

tag_routes = Blueprint('tags', __name__)

@tag_routes.route('')
@login_required
def get_tags():
    tags = Tag.query.filter_by(user_id=current_user.id)
    return {'tags': [tag.to_dict(notes=True) for tag in tags]}

@tag_routes.route('/<int:id>')
@login_required
def get_tag(id):
    tag = Tag.query.get(id)

    if not tag or tag.user_id != current_user.id:
        return {'message':'Tag not found'}, 404

    return tag.to_dict(notes=True)

@tag_routes.route('', methods=['POST'])
@login_required
def create_tag():
    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        tag = Tag(
            user_id = current_user.id,
            name = data['name']
        )
        db.session.add(tag)
        db.session.commit()
        return tag.to_dict(notes=True)
    return {'errors': form.errors}, 401

@tag_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_tag(id):
    form = TagForm()
    tag = Tag.query.get(id)
    
    if not tag:
        return {'errors': {'message': 'Tag not found'}}, 404
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit() and tag.user_id == current_user.id:
        data = form.data
        tag.name = data['name']
        db.session.commit()
        return tag.to_dict(notes=True)
    elif not form.validate_on_submit():
        return {'errors': form.errors}, 401
    return {'errors': {'message': 'Unauthorized'}}, 403

@tag_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_tag(id):
    tag = Tag.query.get(id)
    if not tag or tag.user_id != current_user.id:
        return {'errors': {'message': 'Tag not found'}}, 404

    db.session.delete(tag)
    db.session.commit()
    return {'message':'Tag deleted successfully'}
