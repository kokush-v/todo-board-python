from wtforms import StringField, IntegerField
from wtforms.validators import InputRequired
from flask_wtf import FlaskForm


class CreateTaskForm(FlaskForm):
    title = StringField('title', [InputRequired()])
    description = StringField('description', validators=[InputRequired()])
    type = StringField('type', validators=[InputRequired()])
    board_id = IntegerField('board_id', validators=[InputRequired()])


class UpdateTaskForm(CreateTaskForm):
    id = IntegerField(validators=[InputRequired()])
