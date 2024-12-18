export interface User {
	id: number;
	username: string;
}

export interface UserForBoardPermission extends User {
	role: string;
}

export interface UserTokenResponse {
	token: string;
	user: User;
}

export interface UserLoginForm extends Omit<User, "id"> {
	password: string;
}

export interface UserCreateForm extends UserLoginForm {
	confirm_password: string;
}

export interface UserUpdateForm extends Omit<User, "id"> {}
