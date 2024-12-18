export interface Task {
	id: number;
	title: string;
	description: string;
	type: string;
}

export interface CreateTaskForm extends Omit<Task, "id"> {
	boardId: number;
}
export interface UpdateTaskForm extends Task {
	boardId: number;
}
