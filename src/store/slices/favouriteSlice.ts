import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { authPatcher } from "src/utils/authAxiosMethods";
import { addNotification } from "./notificationSlice";

interface IAddToFavourite {
	productId;
}
interface IRemoveFromFavourite {
	product;
}
interface IClearFavouriteList {}

export const addToFavourite = createAsyncThunk(
	"favourite/addToFavourite",
	async ({ productId }: IAddToFavourite, { dispatch, getState }) => {
		const { auth, favourite } = getState() as any;
		try {
			let favouriteList = favourite.items;

			const product = await axios
				.get(`/api/products/${productId}`)
				.then((res) => res.data.data);

			const isExists = favouriteList.find((item) => item._id === product._id);

			if (isExists) {
				favouriteList = favouriteList.map((item) =>
					item._id === isExists._id ? product : item
				);
			}

			if (!isExists) {
				favouriteList = [product, ...favouriteList];
			}

			await authPatcher(`/api/favourite`, {
				email: auth.user.email,
				favouriteList,
			});

			dispatch(
				addNotification({
					message: `${product.title} added`,
				})
			);

			return favouriteList;
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

export const removeFromFavourite = createAsyncThunk(
	"favourite/removeFromFavourite",
	async ({ product }: IRemoveFromFavourite, { dispatch, getState }) => {
		const { auth, favourite } = getState() as any;
		try {
			let favouriteList = favourite.items;

			favouriteList = favouriteList.filter((item) => item._id !== product._id);

			await authPatcher(`/api/favourite`, {
				email: auth.user.email,
				favouriteList,
			});

			dispatch(
				addNotification({
					type: "delete",
					message: `${product.title} removed`,
				})
			);

			return favouriteList;
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

export const clearFavouriteList = createAsyncThunk(
	"favourite/clearFavouriteList",
	async ({}: IClearFavouriteList, { dispatch, getState }) => {
		const { auth } = getState() as any;
		try {
			let favouriteList = [];

			await authPatcher(`/api/favourite`, {
				email: auth.user.email,
				favouriteList,
			});

			dispatch(
				addNotification({
					type: "delete",
					message: `Favourite list has been cleared`,
				})
			);

			return favouriteList;
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
	items: [],
	add: {
		loading: false,
		error: null,
	},
	remove: {
		loading: false,
		error: null,
	},
	clear: {
		loading: false,
		error: null,
	},
};

const favouriteSlice = createSlice({
	name: "favourite",
	initialState,
	reducers: {
		setFavouriteList: (state, action) => {
			state.items = action.payload;
		},
		clearFavouriteState: (state) => {
			state.items = [];
		},
	},
	extraReducers: (builder) => {
		//// add product to favourite list
		builder.addCase(addToFavourite.pending, (state) => {
			state.add.loading = true;
			state.add.error = null;
		});
		builder.addCase(addToFavourite.fulfilled, (state, action) => {
			state.items = action.payload;
			state.add.loading = false;
		});
		builder.addCase(addToFavourite.rejected, (state, action) => {
			state.add.loading = false;
			state.add.error = action.error.message;
		});
		//// remove product from favourite list
		builder.addCase(removeFromFavourite.pending, (state) => {
			state.remove.loading = true;
			state.remove.error = null;
		});
		builder.addCase(removeFromFavourite.fulfilled, (state, action) => {
			state.items = action.payload;
			state.remove.loading = false;
		});
		builder.addCase(removeFromFavourite.rejected, (state, action) => {
			state.remove.loading = false;
			state.remove.error = action.error.message;
		});
		//// clear favourite list
		builder.addCase(clearFavouriteList.pending, (state) => {
			state.clear.loading = true;
			state.clear.error = null;
		});
		builder.addCase(clearFavouriteList.fulfilled, (state, action) => {
			state.items = action.payload;
			state.clear.loading = false;
		});
		builder.addCase(clearFavouriteList.rejected, (state, action) => {
			state.clear.loading = false;
			state.clear.error = action.error.message;
		});
	},
});

export const { setFavouriteList, clearFavouriteState } = favouriteSlice.actions;

export default favouriteSlice.reducer;
