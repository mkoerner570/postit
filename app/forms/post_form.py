from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField,SubmitField, FileField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


# class PostStoryForm(FlaskForm):
#     title=StringField("Title")
#     body=TextAreaField("Body")
#     submit=SubmitField("Submit")

# class EditPostStoryForm(FlaskForm):
#     title=StringField("Title")
#     body=TextAreaField("Body")
#     submit=SubmitField("Submit")

class PostForm(FlaskForm):
    title=StringField("Title")
    body=FileField("Body")
    sub_id=IntegerField("Sub")
    submit=SubmitField("Submit")

class EditPostForm(FlaskForm):
    title=StringField("Title")
    # body=FileField("Body")
    submit=SubmitField("Submit")

class VotePostForm(FlaskForm):
    votes=IntegerField("Vote")
