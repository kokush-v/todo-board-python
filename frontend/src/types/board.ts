import { UserForBoardPermission } from "./user";

export interface Board {
	id: number;
	name: string;
	is_private: boolean;
}

export interface BoardWithPermissions extends Board {
	permissions: UserForBoardPermission[];
}

export interface BoardCreateForm extends Omit<Board, "id"> {}
export interface BoardUpdateForm extends Board {}
