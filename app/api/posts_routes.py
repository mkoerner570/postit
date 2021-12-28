from flask import Blueprint, jsonify, session, request
import json
from app.models import User, Posts, db
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms import PostForm
from flask_login import current_user, login_user, logout_user, login_required
from app.api.aws_images import (
    allowed_file, get_unique_filename)
import boto3
import os

post_routes = Blueprint('posts', __name__)

# Get all Posts from the database
@post_routes.route('/posts')
def all_posts():
    posts = Posts.query.all()
    return {'post': [post.to_dict() for post in posts ]}



# Get all posts from the database
@post_routes.route("/posts/<int:id>/one")
def single_post(id):
    singlePost = Posts.query.filter(Posts.id == id).first()
    return {'singlePost':singlePost.to_dict()}


# Creates a new Post
@post_routes.route('/add',methods=["POST"])
@login_required
def post_post():
    print("HIT ME !!!!!!!!!!!")
    s3 = boto3.client(
        "s3",
        aws_access_key_id=os.environ.get("S3_KEY"),
        aws_secret_access_key=os.environ.get("S3_SECRET")
    )
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    post = request.files["body"]

    print("THE POST!!!!!!", post)

    post.filename = get_unique_filename(post.filename)
    print("THE FILENAME!!!!!!", post.filename)
    s3.upload_fileobj(post, 'redditimageclone', post.filename,
                                # ExtraArgs={
                                #     'ACL': 'public-read',
                                #     'ContentType': post.content_type
                                # }
                                )
    response = s3.generate_presigned_url('get_object',
                                                Params={'Bucket': 'redditimageclone',
                                                        'Key': post.filename})
    index = response.index("?")
    print("THE RESPONSE!!!!!!!!!",response)
    url_image = response[0:index]

    user = current_user.id
    if form.validate_on_submit():
        data = form.data
        new_post = Posts(
            user_id = user,
            body = url_image,
            post_id = data["post_id"],
            sub_id = data["sub_id"],
            votes = 0
        )
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()
    else:
        return "Unable to Upload"



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
