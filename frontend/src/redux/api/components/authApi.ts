/* eslint-disable no-empty */
import { createApi } from "@reduxjs/toolkit/query/react";
import { APP_KEYS } from "../../../consts";
import {
	User,
	UserCreateForm,
	UserForBoardPermission,
	UserLoginForm,
	UserTokenResponse,
	UserUpdateForm,
} from "../../../types/user";
import { setUser, setUsers } from "../../slice/authSlice";
import { defaultBaseQuery } from "../config";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: defaultBaseQuery,
	tagTypes: ["Auth"],
	endpoints: (builder) => ({
		getUser: builder.query<User, null>({
			providesTags: ["Auth"],
			query() {
				return {
					url: APP_KEYS.BACKEND_KEYS.AUTH.GET_USER,
					credentials: "include",
					headers: {
						Authorization: `Bearer ${localStorage.getItem(APP_KEYS.STORAGE_KEYS.AUTH_TOKEN)}`,
					},
				};
			},
			async onQueryStarted(_args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setUser(data));
				} catch (error) {}
			},
		}),

		getUsers: builder.query<UserForBoardPermission[], null>({
			providesTags: ["Auth"],
			query() {
				return {
					url: APP_KEYS.BACKEND_KEYS.AUTH.GET_ALL,
					credentials: "include",
				};
			},
			async onQueryStarted(_args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setUsers(data));
				} catch (error) {}
			},
		}),

		createUser: builder.mutation<User, UserCreateForm>({
			invalidatesTags: ["Auth"],
			query(data) {
				return {
					url: APP_KEYS.BACKEND_KEYS.AUTH.REGISTER,
					method: "POST",
					body: data,
				};
			},
		}),

		loginUser: builder.mutation<UserTokenResponse, UserLoginForm>({
			invalidatesTags: ["Auth"],
			query(data) {
				return {
					url: APP_KEYS.BACKEND_KEYS.AUTH.LOGIN,
					method: "POST",
					body: data,
				};
			},
			async onQueryStarted(_args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setUser(data.user));
					localStorage.setItem(APP_KEYS.STORAGE_KEYS.AUTH_TOKEN, data.token);
				} catch (error) {}
			},
		}),
		updateUser: builder.mutation<User, UserUpdateForm>({
			invalidatesTags: ["Auth"],
			query(data) {
				return {
					url: APP_KEYS.BACKEND_KEYS.AUTH.UPDATE,
					method: "PUT",
					body: data,
				};
			},
			async onQueryStarted(_args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setUser(data));
				} catch (error) {}
			},
		}),
	}),
});

export const {
	useCreateUserMutation,
	useLazyGetUserQuery,
	useLoginUserMutation,
	useLazyGetUsersQuery,
	useUpdateUserMutation,
} = authApi;
