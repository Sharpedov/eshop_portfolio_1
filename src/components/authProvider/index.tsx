import { useRouter } from "next/router";
import React, {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedUser } from "src/store/slices/authSlice";
import { setShoppingCart } from "src/store/slices/cartSlice";
import { setFavouriteList } from "src/store/slices/favouriteSlice";

interface pageProps {
	children: React.ReactNode;
}

const AuthContext = React.createContext(null);

export const useAuth = () => useContext(AuthContext);

const mapState = (state) => ({
	authUser: state.auth.user,
	authLoading: state.auth.loading,
	authError: state.auth.error,
});

const AuthProvider = ({ children }: pageProps) => {
	const { authUser, authLoading, authError } = useSelector(mapState);
	const [user, setUser] = useState(authUser);
	const [loading, setLoading] = useState<boolean>(true);
	const [isLogged, setIsLogged] = useState<boolean>(false);
	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		setIsLogged(authUser && !authLoading && !authError ? true : false);
		setUser(authUser ?? null);
		setLoading(authLoading);
	}, [authLoading, authUser, authError]);

	useEffect(() => {
		dispatch(getLoggedUser());
	}, [dispatch]);

	useEffect(() => {
		if (isLogged) {
			dispatch(setShoppingCart(user.shoppingCart));
			dispatch(setFavouriteList(user.favouriteList));
		}
	}, [isLogged, user, dispatch]);

	const redirectIfLogged = useCallback(
		(href: string) => {
			if (isLogged && !loading) router.push(href);
		},
		[loading, isLogged, router]
	);

	const redirectIfNotLogged = useCallback(
		(href: string) => {
			if (!isLogged && !loading) router.push(href);
		},
		[loading, isLogged, router]
	);

	const memoredValue = useMemo(
		() => ({
			user,
			loading,
			isLogged,
			redirectIfLogged,
			redirectIfNotLogged,
		}),
		[user, loading, isLogged, redirectIfLogged, redirectIfNotLogged]
	);

	return (
		<AuthContext.Provider value={memoredValue}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
