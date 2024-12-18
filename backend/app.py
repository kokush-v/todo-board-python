from flask import Flask, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required
from database.db_models import db
from controllers.task import *
from controllers.board import *
from controllers.auth import *

app = Flask(__name__)
app.config['SECRET_KEY'] = '8BYkEfBA6O6donzWlSihBXox7C0sKR6b'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'
app.config['WTF_CSRF_ENABLED'] = False
app.config["JWT_SECRET_KEY"] = 'FkBA6O6donzWlSihBXox7C0sKR6b'
app.config['JWT_TOKEN_LOCATION'] = ['headers']

CORS(app, origins=["http://localhost:5173"], supports_credentials=True)

db.init_app(app)
jwt = JWTManager(app)

with app.app_context():
    db.create_all()

# task routes


@app.route('/task/create', methods=['POST'])
@jwt_required()
def create_task():
    if request.method == 'POST':
        data = request.json
        return create_task_controller(data)


@app.route('/task/update', methods=['PUT'])
@jwt_required()
def update_task():
    if request.method == 'PUT':
        data = request.json
        return update_task_controller(data)


@app.route('/task/delete/<task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    if request.method == "DELETE":
        return delete_task_controller(task_id)


@app.route('/task/<int:board_id>', methods=['GET'])
def get_task(board_id):
    if request.method == "GET":
        return get_tasks_by_board_controller(board_id)


# board routes

@app.route('/board/all', methods=['GET'])
def get_all_boards():
    if request.method == 'GET':
        return get_all_boards_controller()


@app.route('/board/<string:board_id>', methods=["GET"])
@jwt_required()
def get_board(board_id):
    if request.method == 'GET':
        return get_board_controller(board_id)


@app.route('/board/create', methods=['POST'])
@jwt_required()
def create_board():
    if request.method == 'POST':
        data = request.json
        return create_board_controller(data)


@app.route('/board/update', methods=["PUT"])
@jwt_required()
def update_board():
    if request.method == 'PUT':
        data = request.json
        return update_board_controller(data)


# authentication routes

@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        data = request.json
        return register_controller(data)


@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.json
        return login_controller(data)


@app.route('/update', methods=['PUT'])
@jwt_required()
def update_user():
    if request.method == 'PUT':
        data = request.json
        return update_user_controller(data)


@app.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    if request.method == 'GET':
        return get_user_controller()


@app.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    if request.method == 'GET':
        return get_users_controller()


if __name__ == '__main__':
    app.run(debug=True)
