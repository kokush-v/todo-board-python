import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { APP_KEYS } from "../../consts";

export const defaultBaseQuery = fetchBaseQuery({
	baseUrl: APP_KEYS.BACKEND_FULL_URL,
	prepareHeaders: (headers) => {
		const token = localStorage.getItem(APP_KEYS.STORAGE_KEYS.AUTH_TOKEN) || "";
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		headers.set("Content-Type", "application/json");
		return headers;
	},
});
