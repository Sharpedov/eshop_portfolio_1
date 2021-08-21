import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getLoggedUser } from "./authSlice";
import { addNotification } from "./notificationSlice";

interface IChangeUserAvatar {
	email: string;
	newAvatar;
}
interface IChangeUserData {
	email: string;
	username: string;
	closeModal: () => void;
}
interface IChangeUserEmail {
	email: string;
	newEmail: string;
	password: string;
	closeModal: () => void;
}
interface IChangeUserPassword {
	email: string;
	currentPassword: string;
	newPassword: string;
	closeModal: () => void;
}

const axiosProgessOption = {
	onUploadProgress: (progressEvent) => {
		const { loaded, total } = progressEvent;
		const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
		console.log("progressEvent", percentage);
	},
};

export const changeUserAvatar = createAsyncThunk(
	"user/changeUserAvatar",
	async ({ email, newAvatar }: IChangeUserAvatar, { dispatch }) => {
		try {
			const res = await axios
				.patch(`/api/users/changeAvatar`, {
					email,
					avatar: newAvatar,
				})
				.then((res) => res.data);

			dispatch(
				addNotification({
					message: res.message,
				})
			);

			dispatch(getLoggedUser());

			return;
		} catch (error) {
			dispatch(
				addNotification({
					type: "error",
					message: error.response.data.message,
				})
			);
			throw error.response.data.message;
		}
	}
);
export const changeUserData = createAsyncThunk(
	"user/changeUserData",
	async ({ email, username, closeModal }: IChangeUserData, { dispatch }) => {
		try {
			const res = await axios
				.patch(
					`/api/users/changeData`,
					{
						email,
						username,
					},
					axiosProgessOption
				)
				.then((res) => res.data);

			closeModal();

			dispatch(
				addNotification({
					message: res.message,
				})
			);

			dispatch(getLoggedUser());

			return;
		} catch (error) {
			dispatch(
				addNotification({
					type: "error",
					message: error.response.data.message,
				})
			);
			throw error.response.data.message;
		}
	}
);

export const changeUserEmail = createAsyncThunk(
	"user/changeUserEmail",
	async (
		{ email, newEmail, password, closeModal }: IChangeUserEmail,
		{ dispatch }
	) => {
		try {
			const res = await axios
				.patch(`/api/users/changeEmail`, {
					email,
					newEmail,
					password,
				})
				.then((res) => res.data);

			closeModal();

			dispatch(
				addNotification({
					message: res.message,
				})
			);

			dispatch(getLoggedUser());

			return;
		} catch (error) {
			dispatch(
				addNotification({
					type: "error",
					message: error.response.data.message,
				})
			);
			throw error.response.data.message;
		}
	}
);

export const changeUserPassword = createAsyncThunk(
	"user/changeUserPassword",
	async (
		{ email, currentPassword, newPassword, closeModal }: IChangeUserPassword,
		{ dispatch }
	) => {
		try {
			const res = await axios
				.patch(`/api/users/changePassword`, {
					email,
					password: currentPassword,
					newPassword,
				})
				.then((res) => res.data);

			closeModal();

			dispatch(
				addNotification({
					message: res.message,
				})
			);

			dispatch(getLoggedUser());

			return;
		} catch (error) {
			dispatch(
				addNotification({
					type: "error",
					message: error.response.data.message,
				})
			);
			throw error.response.data.message;
		}
	}
);

const initialState = {
	loading: false,
	error: null,
	changeAvatar: {
		loading: false,
		error: null,
	},
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// change user avatar
		builder.addCase(changeUserAvatar.pending, (state) => {
			state.changeAvatar.loading = true;
			state.changeAvatar.error = null;
		});
		builder.addCase(changeUserAvatar.fulfilled, (state) => {
			state.changeAvatar.loading = false;
		});
		builder.addCase(changeUserAvatar.rejected, (state, action) => {
			state.changeAvatar.loading = false;
			state.changeAvatar.error = action.error.message;
		});
		//// change user data
		builder.addCase(changeUserData.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(changeUserData.fulfilled, (state) => {
			state.loading = false;
		});
		builder.addCase(changeUserData.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
		//// change user email
		builder.addCase(changeUserEmail.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(changeUserEmail.fulfilled, (state) => {
			state.loading = false;
		});
		builder.addCase(changeUserEmail.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
		//// change user password
		builder.addCase(changeUserPassword.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(changeUserPassword.fulfilled, (state) => {
			state.loading = false;
		});
		builder.addCase(changeUserPassword.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
	},
});

export default cartSlice.reducer;
