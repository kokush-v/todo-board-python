import bcrypt
from flask_jwt_extended import create_access_token, get_jwt_identity
from database.db_models import User, db
from validation.auth import RegistrationForm, LoginForm, UpdateUserForm


def register_controller(data):
    form = RegistrationForm(data=data)

    if form.validate():
        try:
            hashed_password = bcrypt.hashpw(
                form.password.data.encode('utf-8'), bcrypt.gensalt())

            user = User(username=form.username.data,
                        password=hashed_password.decode('utf-8'))
            db.session.add(user)
            db.session.commit()

            response = User.query.get(user.id).toDict()

            return response
        except:
            return {'error': 'User already exists'}, 400

    return {'error': 'Validation failed', 'details': form.errors}, 400


def login_controller(data):
    form = LoginForm(data=data)

    if form.validate():
        try:
            user: User = User.query.filter_by(
                username=form.username.data).first_or_404()

            if user and bcrypt.checkpw(form.password.data.encode('utf-8'), user.password.encode('utf-8')):
                access_token = create_access_token(identity=str(user.id))
            return {'token': access_token, 'user': user.toDict()}
        except:
            return {'error': 'Invalid credentials'}, 401


def update_user_controller(data):
    form = UpdateUserForm(data=data)

    if form.validate():
        user_id = int(get_jwt_identity())
        user: User = User.query.filter(User.id == user_id).first()
        user.username = form.username.data
        db.session.commit()
        return user.toDict()
    else:
        return {'error': 'Validation failed', 'details': form.errors}, 400


def get_users_controller():
    users = User.query.all()
    formated_users = []
    for user in users:
        user_dict = user.toDict()
        formated_users.append(
            {'id': user_dict['id'], 'username': user_dict['username'], "role": 'user'})

    return formated_users


def get_user_controller():
    user_id = int(get_jwt_identity())
    try:
        user: User = User.query.filter(User.id == user_id).first_or_404()
        return user.toDict()
    except:
        return {'message': 'User not found'}, 404
