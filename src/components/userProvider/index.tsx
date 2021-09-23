import React, { useContext, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setLoggedUser } from "src/store/slices/authSlice";
import { setShoppingCart } from "src/store/slices/cartSlice";
import { setFavouriteList } from "src/store/slices/favouriteSlice";
import { authFetcher } from "src/utils/authAxiosMethods";
import useSWR from "swr";

interface pageProps {
	children: React.ReactNode;
}

const UserContext = React.createContext(null);

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }: pageProps) => {
	const { data, mutate, error } = useSWR(
		"/api/auth/getLoggedUser",
		authFetcher
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (data && !error) {
			dispatch(setLoggedUser(data));
			dispatch(setShoppingCart(data.shoppingCart));
			dispatch(setFavouriteList(data.favouriteList));
		}
	}, [dispatch, data, error]);

	const memoredValue = useMemo(
		() => ({
			user: data,
			loading: !data && !error,
			isLogged: Boolean(data && !error),
			loggedOut: Boolean(error),
			mutate,
		}),
		[data, error, mutate]
	);

	return (
		<UserContext.Provider value={memoredValue}>{children}</UserContext.Provider>
	);
};

export default UserProvider;
