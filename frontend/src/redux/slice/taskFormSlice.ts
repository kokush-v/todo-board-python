import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormType } from "../../enums";
import { UpdateTaskForm } from "../../types/task";

interface FormInitialState {
	form: UpdateTaskForm | null;
	type: FormType;
}

const initial: FormInitialState = {
	form: null,
	type: FormType.NEW,
};
const formSlice = createSlice({
	name: "form",
	initialState: initial,
	reducers: {
		setData: (_state, { payload }: PayloadAction<FormInitialState>) => {
			return payload;
		},
	},
});

export const { setData } = formSlice.actions;

export default formSlice.reducer;
