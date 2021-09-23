import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import router from "next/router";
import { authPoster } from "src/utils/authAxiosMethods";
import { mutate } from "swr";
import { clearCartState } from "./cartSlice";
import { clearFavouriteState } from "./favouriteSlice";
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

export const signup = createAsyncThunk(
	"auth/signup",
	async ({ username, email, password }: ISignUp, { dispatch }) => {
		try {
			const data = await axios
				.post("/api/auth/signup", { username, email, password })
				.then((res) => res.data);

			router.replace(
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
			await axios
				.post("/api/auth/login", { email, password })
				.then((res) => res.data);

			await mutate("/api/auth/getLoggedUser");

			dispatch(
				addNotification({
					message: "Successfully logged in",
				})
			);

			router.replace((router.query.redirect as string) ?? "/");

			return;
		} catch (error) {
			dispatch(addNotification({ message: error.response.data.message }));
			throw error.response.data.message;
		}
	}
);

export const logout = createAsyncThunk(
	"auth/logout",
	async (_, { dispatch }) => {
		try {
			await authPoster("/api/auth/logout");
			await mutate("/api/auth/getLoggedUser");

			dispatch(clearCartState());
			dispatch(clearFavouriteState());

			router.pathname.includes("/account") && router.replace("/");
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

const initialState = {
	user: null,
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
		setLoggedUser: (state, action) => {
			state.user = action.payload;
		},
	},

	extraReducers: (builder) => {
		//// login
		builder.addCase(login.pending, (state) => {
			state.login.loading = true;
			state.login.error = null;
		});
		builder.addCase(login.fulfilled, (state, action) => {
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
		builder.addCase(logout.fulfilled, (state) => {
			state.user = null;
		});
	},
});

export const { setLoggedUser } = authSlice.actions;

export default authSlice.reducer;
