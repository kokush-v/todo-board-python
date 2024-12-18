/* eslint-disable no-empty */
import { createApi } from "@reduxjs/toolkit/query/react";
import { APP_KEYS } from "../../../consts";
import { Board, BoardCreateForm, BoardUpdateForm, BoardWithPermissions } from "../../../types/board";
import { setBoard, setBoardList } from "../../slice/boardSlice";
import { taskApi } from "./taskApi";
import { defaultBaseQuery } from "../config";

export const boardApi = createApi({
	reducerPath: "boardApi",
	baseQuery: defaultBaseQuery,
	tagTypes: ["Board"],
	endpoints: (builder) => ({
		getBoards: builder.query<BoardWithPermissions[], null>({
			providesTags: ["Board"],
			query() {
				return {
					url: APP_KEYS.BACKEND_KEYS.BOARD.GET_ALL,
					credentials: "include",
				};
			},
			async onQueryStarted(_args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setBoardList({ boards: data }));
				} catch (error) {}
			},
		}),

		getBoard: builder.query<BoardWithPermissions, string>({
			providesTags: ["Board"],
			query(name) {
				return {
					url: APP_KEYS.BACKEND_KEYS.BOARD.ROOT(name),
					credentials: "include",
				};
			},
			async onQueryStarted(_args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setBoard(data));
					dispatch(taskApi.endpoints.getTasks.initiate(data.id));
				} catch (error) {}
			},
		}),

		createBoard: builder.mutation<Board, BoardCreateForm>({
			invalidatesTags: ["Board"],
			query(data) {
				return {
					url: APP_KEYS.BACKEND_KEYS.BOARD.CREATE,
					method: "POST",
					body: data,
				};
			},
			async onQueryStarted(_args, { dispatch, queryFulfilled }) {
				const { data } = await queryFulfilled;
				dispatch(boardApi.endpoints.getBoard.initiate(data.name, { forceRefetch: true }));
			},
		}),

		updateBoard: builder.mutation<Board, BoardUpdateForm>({
			invalidatesTags: ["Board"],
			query(data) {
				return {
					url: APP_KEYS.BACKEND_KEYS.BOARD.UPDATE,
					method: "PUT",
					body: data,
				};
			},
		}),
	}),
});

export const { useCreateBoardMutation, useUpdateBoardMutation, useLazyGetBoardQuery, useLazyGetBoardsQuery } = boardApi;
