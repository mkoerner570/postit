from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

comment_routes = Blueprint('comments', __name__)

# Get all songs from the database
@comment_routes.route("/posts/<int:id>")
def single_songs(id):
    singlePost = Posts.query.filter(Posts.id == id).first()
    return {'singlePost':singlePost.to_dict()}

# Posts a new comment to the song
@comment_routes.route('/add',methods=["POST"])
@login_required
def post_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    user = current_user.id
    if form.validate_on_submit():
        data = form.data
        new_comment = Comments(
            user_id = user,
            body = data["body"],
            post_id = data["post_id"]
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    else:
        return "Bad Data"


# Delete's a comment made by the user
@comment_routes.route('/destroy/<int:id>',methods=["DELETE"])
@login_required
def delete_comment(id):
    comment = Comments.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()


# Edit comment made by the user
@comment_routes.route('/<int:id>/edit',methods=["PUT"])
@login_required
def edit_comment(id):
    current_comment = Comments.query.get(id)
    form = EditCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comments.query.get(id)
        comment.content = form.data["content"]
        db.session.commit()
        return comment.to_dict()
    else:
        return form.errors
