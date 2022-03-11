from flask import Blueprint, jsonify, session, request
import json
from app.models import User, Posts, Subs, db

sub_routes = Blueprint('subs', __name__)

# Get all Posts from the database
@sub_routes.route('/subs')
def all_subs():
    subs = Subs.query.all()
    return {'sub': [sub.to_dict() for sub in subs ]}


@sub_routes.route('/subs/create')
def new_sub():
    
