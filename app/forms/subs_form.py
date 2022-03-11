from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField,SubmitField, FileField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class SubsForm(FlaskForm):
    title=StringField("Title")

class EditSubsForm(FlaskForm):
    
