from wtforms import StringField
from wtforms.validators import InputRequired
from flask_wtf import FlaskForm


class LoginForm(FlaskForm):
    username = StringField('username', validators=[InputRequired()])
    password = StringField('password', validators=[InputRequired()])


class RegistrationForm(LoginForm):
    username = StringField('username', validators=[InputRequired()])
    password = StringField('password', validators=[InputRequired()])
    confirm_password = StringField(
        'confirm_password', validators=[InputRequired()])


class UpdateUserForm(FlaskForm):
    username = StringField('username', validators=[InputRequired()])
