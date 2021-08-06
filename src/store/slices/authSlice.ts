import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import router from "next/router";
import { addNotification } from "./notificationSlice";

interface ISignUp {
	username: string;
	email: string;
	password: string;
}

interface ILogin {
	email: string;
	password: string;
}

export const getLoggedUser = createAsyncThunk(
	"auth/fetchLoggedUser",
	async () => {
		try {
			const res = await axios
				.get("/api/auth/getAuthCookie")
				.then((res) => res.data);

			if (res.success === false) return {};

			const user = await axios
				.get(`/api/users?id=${res.data._id}`)
				.then((res) => res.data.user);

			return user;
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

export const signup = createAsyncThunk(
	"auth/signup",
	async ({ username, email, password }: ISignUp, { dispatch }) => {
		try {
			const data = await axios
				.post("/api/auth/signup", { username, email, password })
				.then((res) => res.data);

			router.push(
				`${
					router.query.redirect
						? `/sign-in?redirect${router.query.redirect}`
						: "/sign-in"
				}`
			);

			dispatch(
				addNotification({
					message: "Successfully created account",
				})
			);

			return data;
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

export const login = createAsyncThunk(
	"auth/login",
	async ({ email, password }: ILogin, { dispatch }) => {
		try {
			const data = await axios
				.post("/api/auth/login", { email, password })
				.then((res) => res.data.user);

			router.push(`${router.query.redirect ?? "/"}`);

			dispatch(
				addNotification({
					message: "Successfully logged in",
				})
			);

			return data;
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

export const logout = createAsyncThunk("auth/logout", async () => {
	try {
		await axios.post("/api/auth/logout").then((res) => res.data);

		router.reload();
	} catch (error) {
		throw error.response.data.message;
	}
});

const initialState = {
	user: {},
	loading: true,
	login: {
		loading: false,
		error: null,
	},
	signup: {
		loading: false,
		error: null,
	},
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		resetAuthState: () => initialState,
	},

	extraReducers: (builder) => {
		//// fetch logged user
		builder.addCase(getLoggedUser.pending, (state) => {
			state.loading = true;
			state.user = state.user;
		});
		builder.addCase(getLoggedUser.fulfilled, (state, action) => {
			state.user = action.payload;
			state.loading = false;
		});
		builder.addCase(getLoggedUser.rejected, (state) => {
			state.loading = false;
		});
		//// login
		builder.addCase(login.pending, (state) => {
			state.login.loading = true;
			state.login.error = null;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.user = action.payload;
			state.login.loading = false;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.login.loading = false;
			state.login.error = action.error.message;
		});
		//// sign up
		builder.addCase(signup.pending, (state) => {
			state.signup.loading = true;
			state.signup.error = null;
		});
		builder.addCase(signup.fulfilled, (state, action) => {
			state.signup.loading = false;
		});
		builder.addCase(signup.rejected, (state, action) => {
			state.signup.loading = false;
			state.signup.error = action.error.message;
		});
		//// logout
		builder.addCase(logout.fulfilled, (state, action) => {
			resetAuthState();
			state.user = {};
		});
	},
});

export const { resetAuthState } = authSlice.actions;

export default authSlice.reducer;
