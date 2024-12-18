import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserForBoardPermission } from "../../types/user";

interface AuthInitialState {
	user: User | null;
	users: UserForBoardPermission[];
}

const initial: AuthInitialState = {
	user: null,
	users: [],
};
const authSlice = createSlice({
	name: "auth",
	initialState: initial,
	reducers: {
		setUser: (state, { payload }: PayloadAction<User | null>) => {
			state.user = payload;
		},
		setUsers: (state, { payload }: PayloadAction<UserForBoardPermission[]>) => {
			state.users = payload;
		},
	},
});

export const { setUser, setUsers } = authSlice.actions;

export default authSlice.reducer;
