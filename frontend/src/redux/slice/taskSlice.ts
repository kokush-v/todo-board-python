import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../types/task";

interface EditItemPayload {
	data: Task;
}

interface SetItemPayload {
	data: Task[];
}

interface ReorderItemPayload {
	column: string;
	data: Task[];
}

interface TaskInitialState {
	tasks: {
		todoColumn: Task[];
		inProgressColumn: Task[];
		doneColumn: Task[];
	};
}

const initial: TaskInitialState = {
	tasks: {
		todoColumn: [],
		inProgressColumn: [],
		doneColumn: [],
	},
};

const taskSlice = createSlice({
	name: "tasks",
	initialState: initial,
	reducers: {
		addItem: ({ tasks }, { payload }: PayloadAction<EditItemPayload>) => {
			tasks[payload.data.type as keyof typeof tasks].push(payload.data);
		},
		setItems: ({ tasks }, { payload }: PayloadAction<SetItemPayload>) => {
			Object.keys(tasks).forEach((key) => {
				tasks[key as keyof typeof tasks] = payload.data.filter((item) => item.type === key);
			});
		},

		editItem: ({ tasks }, { payload }: PayloadAction<EditItemPayload>) => {
			tasks[payload.data.type as keyof typeof tasks] = tasks[
				payload.data.type as keyof typeof tasks
			].map((item) => {
				if (item.id === payload.data.id) return payload.data;
				else return item;
			});
		},

		moveItem: ({ tasks }, { payload }: PayloadAction<EditItemPayload>) => {
			Object.keys(tasks).forEach((key) => {
				tasks[key as keyof typeof tasks] = tasks[key as keyof typeof tasks].filter(
					(item) => item.id !== payload.data.id
				);
			});
			tasks[payload.data.type as keyof typeof tasks].push(payload.data);
		},

		reorderItems: ({ tasks }, { payload }: PayloadAction<ReorderItemPayload>) => {
			tasks[payload.column as keyof typeof tasks] = payload.data;
		},

		deleteItem: ({ tasks }, { payload }: PayloadAction<EditItemPayload>) => {
			tasks[payload.data.type as keyof typeof tasks] = tasks[
				payload.data.type as keyof typeof tasks
			].filter((item) => {
				return item.id !== payload.data.id;
			});
		},
	},
});

export const { addItem, moveItem, editItem, reorderItems, setItems, deleteItem } =
	taskSlice.actions;

export default taskSlice.reducer;
