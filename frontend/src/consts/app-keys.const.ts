export const BACKEND_KEYS = {
	SERVER_URL: process.env.REACT_APP_NODE_ENV === "dev" ? "http://127.0.0.1:5000" : process.env.REACT_APP_API_URL,
	API_VERSION: "/api/v1",
	TASK: {
		ROOT: (id: number) => `task/${id}`,
		CREATE: "task/create",
		UPDATE: "task/update",
		DELETE: (id: number) => `task/delete/${id}`,
	},
	BOARD: {
		ROOT: (id: string) => `board/${id}`,
		CREATE: "board/create",
		UPDATE: "board/update",
		GET_ALL: "board/all",
	},
	AUTH: {
		REGISTER: "register",
		LOGIN: "login",
		UPDATE: "update",
		GET_USER: "user",
		GET_ALL: "users",
	},
};

export const STORAGE_KEYS = {
	BOARD_DATA: "boardData",
	AUTH_TOKEN: "token",
};

export const BACKEND_FULL_URL = BACKEND_KEYS.SERVER_URL;
