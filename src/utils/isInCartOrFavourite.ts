import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

interface pageProps {
	id;
}

const mapState = (state) => ({
	cart: state.cart.items,
	favourite: state.favourite.items,
});

export const isInCartOrFavourite = ({ id }: pageProps) => {
	const { cart, favourite } = useSelector(mapState);
	const [isInCart, setIsInCart] = useState<boolean>(false);
	const [isInFavourite, setIsInFavourite] = useState<boolean>(false);

	useMemo(() => {
		setIsInCart(cart.find((item) => item._id === id) ? true : false);
		setIsInFavourite(favourite.find((item) => item._id === id) ? true : false);
	}, [cart, favourite, id]);

	return { isInCart, isInFavourite };
};
