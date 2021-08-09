import {
	createAsyncThunk,
	createDraftSafeSelector,
	createSelector,
	createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { addNotification } from "./notificationSlice";

interface IAddProductToCart {
	productId;
	qty: number;
}

interface IRemoveProductToCart {
	product;
}

interface IChangeQtyItem {
	productId;
	qty: number;
}

export const addToCart = createAsyncThunk(
	"cart/addProductToCart",
	async ({ productId, qty }: IAddProductToCart, { dispatch, getState }) => {
		try {
			const { auth, cart } = getState() as any;
			let shoppingCart = cart.items;

			const product = await axios
				.get(`/api/products/${productId}`)
				.then((res) => res.data.data);

			const isExists = shoppingCart.find((item) => item._id === product._id);

			if (isExists) {
				shoppingCart = shoppingCart.map((item) =>
					item._id === isExists._id ? { ...product, qty } : item
				);
			}

			if (!isExists) {
				shoppingCart = [{ ...product, qty }, ...cart.items];
			}

			await axios.patch("/api/cart", {
				email: auth.user.email,
				shoppingCart,
			});

			dispatch(
				addNotification({
					type: "success",
					message: `${product.title} added to cart`,
				})
			);

			return shoppingCart;
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

export const removeFromCart = createAsyncThunk(
	"cart/removeProductFromCart",
	async ({ product }: IRemoveProductToCart, { dispatch, getState }) => {
		try {
			const { auth, cart } = getState() as any;
			let shoppingCart = cart.items;

			shoppingCart = shoppingCart.filter((item) => item._id !== product._id);

			await axios.patch("/api/cart", {
				email: auth.user.email,
				shoppingCart,
			});

			dispatch(
				addNotification({
					type: "delete",
					message: `${product.title} removed from cart`,
				})
			);

			return shoppingCart;
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

export const changeQtyItem = createAsyncThunk(
	"cart/changeQtyItem",
	async ({ productId, qty }: IChangeQtyItem, { dispatch, getState }) => {
		try {
			const { auth, cart } = getState() as any;
			let shoppingCart = cart.items;
			const specificItem = shoppingCart.find((item) => item._id === productId);

			if (!specificItem) return;

			shoppingCart = shoppingCart.map((item) =>
				item._id === specificItem._id ? { ...specificItem, qty } : item
			);

			await axios.patch("/api/cart", {
				email: auth.user.email,
				shoppingCart,
			});

			return shoppingCart;
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
	changeQty: {
		loading: false,
		error: null,
	},
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		setShoppingCart: (state, action) => {
			state.items = action.payload;
		},

		clearCart: (state) => {
			state.items = [];
		},
	},
	extraReducers: (builder) => {
		//// add product to cart
		builder.addCase(addToCart.pending, (state) => {
			state.add.loading = true;
			state.add.error = null;
		});
		builder.addCase(addToCart.fulfilled, (state, action) => {
			state.items = action.payload;
			state.add.loading = false;
		});
		builder.addCase(addToCart.rejected, (state, action) => {
			state.add.loading = false;
			state.add.error = action.error.message;
		});
		//// remove product from cart
		builder.addCase(removeFromCart.pending, (state, action) => {
			state.remove.loading = true;
			state.remove.error = null;
		});
		builder.addCase(removeFromCart.fulfilled, (state, action) => {
			state.items = action.payload;
			state.remove.loading = false;
		});
		builder.addCase(removeFromCart.rejected, (state, action) => {
			state.remove.loading = false;
			state.remove.error = action.error.message;
		});
		//// remove product from cart
		builder.addCase(changeQtyItem.pending, (state, action) => {
			state.changeQty.loading = true;
			state.changeQty.error = null;
		});
		builder.addCase(changeQtyItem.fulfilled, (state, action) => {
			state.items = action.payload;
			state.changeQty.loading = false;
		});
		builder.addCase(changeQtyItem.rejected, (state, action) => {
			state.changeQty.loading = false;
			state.changeQty.error = action.error.message;
		});
	},
});

export const { clearCart, setShoppingCart } = cartSlice.actions;

export default cartSlice.reducer;
