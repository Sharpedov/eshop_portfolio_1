import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

interface IPayload {
	payload: {
		type?: "success" | "error" | "delete" | "info" | "warning";
		message: string;
	};
}

const initialState = {
	notifications: [],
};

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		addNotification: (state, action: IPayload) => {
			const { type, message } = action.payload;

			state.notifications = [
				...state.notifications,
				{
					id: v4(),
					type: type ? type.toUpperCase() : "SUCCESS",
					message: message,
				},
			];
		},

		removeNotification: (state, action) => {
			state.notifications = state.notifications.filter(
				(el) => el.id !== action.payload.id
			);
		},
		clearNotifications: (state) => {
			state.notifications = [];
		},
	},
});

export const { addNotification, removeNotification, clearNotifications } =
	notificationSlice.actions;

export default notificationSlice.reducer;
