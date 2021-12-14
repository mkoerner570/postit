from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

post_routes = Blueprint('posts', __name__)

# Get all comments from the database
@post_routes.route('/posts')
def all_posts():
	posts = Posts.query.all()
    return {'post':[posts.to_dict() for post in posts ]}


