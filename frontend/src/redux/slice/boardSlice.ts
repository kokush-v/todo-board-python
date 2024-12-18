import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APP_KEYS } from "../../consts";
import { BoardWithPermissions } from "../../types/board";

interface GetBoardsPayload {
	boards: BoardWithPermissions[];
}

interface BoardInitialState {
	board: BoardWithPermissions | null;
	boardList: BoardWithPermissions[];
}

const initial: BoardInitialState = {
	board: null,
	boardList: [],
};
const boardSlice = createSlice({
	name: "board",
	initialState: initial,
	reducers: {
		setBoard: (state, { payload }: PayloadAction<BoardWithPermissions | null>) => {
			localStorage.setItem(APP_KEYS.STORAGE_KEYS.BOARD_DATA, JSON.stringify(payload));
			state.board = payload;
		},
		setBoardList: (state, { payload }: PayloadAction<GetBoardsPayload>) => {
			state.boardList = payload.boards;
		},
	},
});

export const { setBoard, setBoardList } = boardSlice.actions;

export default boardSlice.reducer;
