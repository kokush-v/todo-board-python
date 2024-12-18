from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import JSON, Boolean, Column, ForeignKey, Integer, String, inspect
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


db = SQLAlchemy(model_class=Base)


class DbModel():
    def toDict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}


class Board(db.Model, DbModel):
    __tablename__ = "board"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String)
    is_private: Mapped[bool] = mapped_column(Boolean)
    permissions: Mapped[list[dict[str, str]]] = mapped_column(JSON)
    tasks = relationship("Task", backref='board')


class Task(db.Model, DbModel):
    __tablename__ = 'tasks'
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(String)
    type: Mapped[str] = mapped_column(String)
    board_id = Column(Integer, ForeignKey('board.id'))


class User(db.Model, DbModel):
    __tablename__ = 'users'
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String, unique=True)
    password: Mapped[str] = mapped_column(String)
