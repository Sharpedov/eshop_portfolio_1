import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { addNotification } from "./notificationSlice";

interface ICreateCheckoutSession {
	email: string;
	cartItems: [{}];
}

export const createCheckoutSession = createAsyncThunk(
	"checkout/createCheckoutSession",
	async ({ email, cartItems }: ICreateCheckoutSession, { dispatch }) => {
		try {
			const stripePromise = loadStripe(
				process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
			);
			const stripe = await stripePromise;

			const checkoutSession = await axios.post(
				"/api/checkout/session",
				{
					items: cartItems,
					email: email,
				},
				{ headers: { "Content-Type": "application/json" } }
			);

			const result = await stripe.redirectToCheckout({
				sessionId: checkoutSession.data.id,
			});

			dispatch(
				addNotification({
					message: "Order completed",
				})
			);

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
};

const checkoutSlice = createSlice({
	name: "checkout",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		//// create checkout session
		builder.addCase(createCheckoutSession.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(createCheckoutSession.fulfilled, (state) => {
			state.loading = false;
		});
		builder.addCase(createCheckoutSession.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
	},
});

export default checkoutSlice.reducer;
