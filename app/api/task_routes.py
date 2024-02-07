from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Task
from app.forms import TaskForm

task_routes = Blueprint('tasks', __name__)

@task_routes.route('')
@login_required
def get_tasks():
    tasks = Task.query.filter_by(assigner_id=current_user.id)
    return {'tasks': [task.to_dict() for task in tasks]}

@task_routes.route('/<int:id>')
@login_required
def get_task(id):
    task = Task.query.get(id)

    if not task or task.assigner_id != current_user.id:
        return {'message':'Task not found'}, 404

    return {'task': task.to_dict()}

@task_routes.route('', methods=['POST'])
@login_required
def create_task():
    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        task = Task(
            assigner_id = current_user.id,
            assignee_id = current_user.id,
            description = data['description'],
            completed = data['completed'],
            due_date = data['due_date']
        )
        db.session.add(task)
        db.session.commit()
        return task.to_dict()
    return {'errors': form.errors}, 401

@task_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_task(id):
    form = TaskForm()
    task = Task.query.get(id)
    
    if not task:
        return {'errors': {'message': 'task not found'}}, 404
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit() and task.assigner_id == current_user.id:
        data = form.data
        task.completed = data['completed']
        if data['description'] is not None:
            task.description = data['description']
        if data['due_date'] is not None:
            task.due_date = data['due_date']
        db.session.commit()
        return task.to_dict()
    elif not form.validate_on_submit():
        return {'errors': form.errors}, 401
    return {'errors': {'message': 'Unauthorized'}}, 403

@task_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_task(id):
    task = Task.query.get(id)
    if not task or task.assigner_id != current_user.id:
        return {'errors': {'message': 'Task not found'}}, 404

    db.session.delete(task)
    db.session.commit()
    return {'message':'Task deleted successfully'}
