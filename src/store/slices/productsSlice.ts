import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
	"products/fetchProducts",
	async ({ gender, sort }: any, {}) => {
		try {
			console.log(Object(sort));

			const data = await axios
				.get(`/api/products?sort=${Object(sort)}&gender=${gender}`)
				.then((res) => res.data);

			return { data, gender };
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

const initialState = {
	productsMen: [],
	productsWomen: [],
	loading: true,
	error: null,
	// lastDocMen: null,
	// lastDocWomen: null,
	category: null,
	filters: {
		brand: [],
		category: [],
	},
};

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		addFilters: (state, action) => {
			switch (action.payload.filter) {
				case "brand": {
					state.filters.brand = [...state.filters.brand, action.payload.value];
				}
				case "category": {
					state.filters.category = [
						...state.filters.category,
						action.payload.value,
					];
				}
				default:
					state.filters;
			}
		},
		removeFilters: (state, action) => {
			switch (action.payload.filter) {
				case "brand": {
					state.filters.brand = state.filters.brand.filter(
						(brand) => brand !== action.payload.value
					);
				}
				case "category": {
					state.filters.category = state.filters.category.filter(
						(cat) => cat !== action.payload.value
					);
				}
				default:
					state.filters;
			}
		},
	},

	extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state) => {
			state.loading = true;
			state.productsMen = [];
			state.productsWomen = [];
			// state.productsMen = [...state.productsMen];
			// state.productsWomen = [...state.productsWomen];
		});

		builder.addCase(
			fetchProducts.fulfilled,
			(state, { payload: { gender, data } }) => {
				state.category = gender;
				state.loading = false;
				if (gender === "men") {
					state.productsMen = [...state.productsMen, ...data];
					// state.lastDocMen = lastDoc;
				}
				if (gender === "women") {
					state.productsWomen = [...state.productsWomen, ...data];
					// state.lastDocWomen = lastDoc;
				}
			}
		);

		builder.addCase(fetchProducts.rejected, (state, action: any) => {
			state.loading = false;
			state.error = action.error.message;
		});
	},
});

export const { addFilters, removeFilters } = productSlice.actions;

export default productSlice.reducer;
