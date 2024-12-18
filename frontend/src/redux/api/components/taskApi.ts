/* eslint-disable no-empty */
import { createApi } from "@reduxjs/toolkit/query/react";
import { APP_KEYS } from "../../../consts";
import { CreateTaskForm, Task, UpdateTaskForm } from "../../../types/task";
import { addItem, deleteItem, editItem, setItems } from "../../slice/taskSlice";
import { defaultBaseQuery } from "../config";

export const taskApi = createApi({
	reducerPath: "taskApi",
	baseQuery: defaultBaseQuery,
	tagTypes: ["Task"],
	endpoints: (builder) => ({
		getTasks: builder.query<Task[], number>({
			providesTags: ["Task"],
			query(id) {
				return {
					url: APP_KEYS.BACKEND_KEYS.TASK.ROOT(id),
					credentials: "include",
				};
			},
			async onQueryStarted(_args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setItems({ data }));
				} catch (error) {}
			},
		}),

		addTask: builder.mutation<Task, CreateTaskForm>({
			invalidatesTags: ["Task"],
			query(data) {
				return {
					url: APP_KEYS.BACKEND_KEYS.TASK.CREATE,
					method: "POST",
					body: data,
				};
			},
			async onQueryStarted(_args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(addItem({ data }));
				} catch (error) {}
			},
		}),

		updateTask: builder.mutation<Task, UpdateTaskForm>({
			query(data) {
				return {
					url: APP_KEYS.BACKEND_KEYS.TASK.UPDATE,
					method: "PUT",
					body: data,
				};
			},
			async onQueryStarted(_args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(editItem({ data }));
				} catch (error) {}
			},
		}),
		deleteTask: builder.mutation<Task, number>({
			query(id) {
				return {
					url: APP_KEYS.BACKEND_KEYS.TASK.DELETE(id),
					method: "DELETE",
				};
			},
			async onQueryStarted(_args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(deleteItem({ data }));
				} catch (error) {}
			},
		}),
	}),
});

export const { useAddTaskMutation, useGetTasksQuery, useUpdateTaskMutation, useDeleteTaskMutation } = taskApi;
