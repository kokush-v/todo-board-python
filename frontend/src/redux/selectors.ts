import { RootState } from "./store";

export const boardSelector = (state: RootState) => state.boardSlice.board;
export const allBoardsSelector = (state: RootState) => state.boardSlice.boardList;
export const taskSelector = (state: RootState) => state.taskSlice.tasks;
export const taskFormSelector = (state: RootState) => state.formSlice;
export const userSelector = (state: RootState) => state.authSlice.user;
export const usersSelector = (state: RootState) => state.authSlice.users;
