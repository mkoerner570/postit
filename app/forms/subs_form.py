from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField,SubmitField, FileField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class SubsForm(FlaskForm):
    title=StringField("Title")
    submit=SubmitField("Submit")

class EditSubsForm(FlaskForm):
    title=StringField("Title")
    submit=SubmitField("Submit")
