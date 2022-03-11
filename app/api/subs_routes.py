from flask import Blueprint, jsonify, session, request
import json
from app.models import User, Posts, Subs, db
from app.forms import SubsForm
from app.forms import EditSubsForm

sub_routes = Blueprint('subs', __name__)

# Get all Posts from the database
@sub_routes.route('/subs')
def all_subs():
    subs = Subs.query.all()
    return {'sub': [sub.to_dict() for sub in subs ]}


@sub_routes.route('/subs/create', methods=["POST"])
def new_sub():
    form = SubsForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    user = current_user.id
    if form.validate_on_submit():
        data = form.data
        new_sub = Subs(
            user_id = user,
            title = form.data["title"]
        )
        db.session.add(new_sub)
        db.session.commit()
        return new_sub.to_dict()
    else:
        return "Bad Data"
