from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Note

note_routes = Blueprint('notes', __name__)
