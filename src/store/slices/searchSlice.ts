import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	term: "",
};

const searchSlice = createSlice({
	name: "search",
	initialState,
	reducers: {
		addSearchTerm: (state, action) => {
			state.term = action.payload;
		},
	},
});

export const { addSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
