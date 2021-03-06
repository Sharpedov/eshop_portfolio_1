import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import notificationSlice from "./slices/notificationSlice";
import authSlice from "./slices/authSlice";
import favouriteSlice from "./slices/favouriteSlice";
import cartSlice from "./slices/cartSlice";
import searchSlice from "./slices/searchSlice";
import checkoutSlice from "./slices/checkoutSlice";
import userSlice from "./slices/userSlice";

const middlewares = [thunk];

const reducer = combineReducers({
	auth: authSlice,
	cart: cartSlice,
	notifications: notificationSlice,
	favourite: favouriteSlice,
	search: searchSlice,
	checkout: checkoutSlice,
	user: userSlice,
});

const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
