from flask_jwt_extended import get_jwt_identity
from database.db_models import Board, User, db
from validation.board import CreateBoardForm, PermissionsForm, UpdateBoardForm


def create_board_controller(data):
    form = CreateBoardForm(data=data)

    if form.validate():
        user_id = int(get_jwt_identity())

        user: User = User.query.get(user_id)

        new_board = Board(
            name=form.name.data,
            is_private=form.is_private.data,
            permissions=[
                {"id": user.id, "username": user.username, "role": "owner"}
            ])

        db.session.add(new_board)
        db.session.commit()

        response = Board.query.get(new_board.id).toDict()
        return response

    return {'error': 'Validation failed', 'details': form.errors}, 400


def update_board_controller(data):
    form = UpdateBoardForm(data=data)

    if form.validate():
        board: Board = Board.query.get(form.id.data)

        board.name = form.name.data
        board.is_private = form.is_private.data
        board.permissions = []

        for permission in data["permissions"]:
            permission_form = PermissionsForm(data={
                "id": permission["id"],
                "username": permission["username"],
                "role": permission["role"]
            })

            if permission_form.validate():
                board.permissions.append(permission)

        db.session.commit()

        return Board.query.get(form.id.data).toDict()

    return {'error': 'Validation failed', 'details': form.errors}, 400


def get_board_controller(board_id):
    try:
        board: Board = Board.query.filter_by(id=board_id).one_or_404()
        return board.toDict()
    except:
        return {"error": "No board found"}, 404


def get_all_boards_controller():
    try:
        boards = Board.query.all()
        return [board.toDict() for board in boards]
    except:
        return {"error": "Server error"}, 404
