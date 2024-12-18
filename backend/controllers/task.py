from database.db_models import Board, db
from database.db_models import Task
from validation.task import CreateTaskForm, UpdateTaskForm


def create_task_controller(data):
    form = CreateTaskForm(data=data)

    if form.validate():
        new_task = Task(
            title=form.title.data,
            description=form.description.data,
            type=form.type.data,
            board_id=form.board_id.data
        )

        db.session.add(new_task)
        db.session.commit()

        response = Task.query.get(new_task.id).toDict()
        return response

    return {'error': 'Validation failed', 'details': form.errors}, 400


def update_task_controller(data):
    form = UpdateTaskForm(data=data)

    if form.validate():
        task = Task.query.get(form.id.data)
        task.title = form.title.data
        task.description = form.description.data
        task.type = form.type.data

        db.session.commit()
        return Task.query.get(form.id.data).toDict()

    return {'error': 'Validation failed', 'details': form.errors}, 400


def delete_task_controller(task_id):
    try:
        task = Task.query.get(task_id).toDict()
        Task.query.filter_by(id=task_id).delete()
        db.session.commit()

        return task
    except:
        return {"error": "No task found"}, 404


def get_tasks_by_board_controller(board_id):
    try:
        Board.query.get(board_id)
        tasks = [task.toDict() for task in Task.query.filter_by(
            board_id=board_id).all()]

        return tasks
    except:
        return {"error": "No board found"}, 404
