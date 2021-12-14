from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField,HiddenField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


class CommentForm(FlaskForm):
    post_id=HiddenField("post_id")
    content=TextAreaField("content")
    submit=SubmitField("Submit")

class EditCommentForm(FlaskForm):
    post_id=HiddenField("post_id")
    content = TextAreaField("content")
    submit = SubmitField("Submit")
