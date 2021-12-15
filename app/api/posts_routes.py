from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

post_routes = Blueprint('posts', __name__)

# Get all Posts from the database
@post_routes.route('/posts')
def all_posts():
    posts = Posts.query.all()
    return {'post':[posts.to_dict() for post in posts ]}


# Get all songs from the database
@post_routes.route("/posts/<int:id>")
def single_post(id):
    singlePost = Posts.query.filter(Post.id == id).first()
    return {'singlePost':singlePost.to_dict()}


# Creates a new Post
@post_routes.route('/add',methods=["POST"])
@login_required
def post_post():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    user = current_user.id
    if form.validate_on_submit():
        data = form.data
        new_comment = Posts(
            user_id = user,
            body = data["body"],
            post_id = data["post_id"]
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    else:
        return "Bad Data"


# Edit post made by the user
@post_routes.route('/<int:id>/edit',methods=["PUT"])
@login_required
def edit_post(id):
    current_post = Posts.query.get(id)
    form = EditPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Posts.query.get(id)
        post.content = form.data["body"]
        db.session.commit()
        return post.to_dict()
    else:
        return form.errors


# Delete a Post made by the user
@post_routes.route('/destroy/<int:id>',methods=["DELETE"])
@login_required
def delete_post(id):
    post = Posts.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return post.to_dict()
