from wtforms import StringField, IntegerField, BooleanField, ValidationError, FieldList, FormField
from wtforms.validators import InputRequired
from flask_wtf import FlaskForm


def boolean_required(_, field):
    if field.data not in [True, False]:
        raise ValidationError('This field must be True or False.')


class CreateBoardForm(FlaskForm):
    name = StringField('name', validators=[InputRequired()])
    is_private = BooleanField('is_private', validators=[boolean_required])


class PermissionsForm(FlaskForm):
    id = IntegerField('id')
    username = StringField('username')
    role = StringField('role')


class UpdateBoardForm(FlaskForm):
    id = IntegerField('id', validators=[InputRequired()])
    is_private = BooleanField('is_private', validators=[InputRequired()])
    name = StringField('name', validators=[InputRequired()])
