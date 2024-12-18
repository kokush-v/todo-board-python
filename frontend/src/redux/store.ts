import { configureStore } from "@reduxjs/toolkit";
import { boardApi } from "./api/components/boardApi";
import { taskApi } from "./api/components/taskApi";
import { authApi } from "./api/components/authApi";

import boardSlice from "./slice/boardSlice";
import formSlice from "./slice/taskFormSlice";
import taskSlice from "./slice/taskSlice";
import authSlice from "./slice/authSlice";

const store = configureStore({
	reducer: {
		[boardApi.reducerPath]: boardApi.reducer,
		[taskApi.reducerPath]: taskApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		taskSlice,
		boardSlice,
		formSlice,
		authSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([boardApi.middleware, taskApi.middleware, authApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
