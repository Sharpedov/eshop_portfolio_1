import React, { useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import { useRouter } from "next/router";
import CustomButton from "../customButton";
import EmptyPageHeader from "../emptyPageHeader";
import Sidebar from "../sidebar";
import SpinnerLoading from "../loadingIndicators/spinnerLoading";
import { useAuth } from "../authProvider";
import CartProduct from "./cartProduct";
import { createCheckoutSession } from "src/store/slices/checkoutSlice";
import { toggleCart } from "src/store/slices/cartSlice";
import { motion } from "framer-motion";

interface pageProps {}

const mapState = (state) => ({
	cart: state.cart.items,
	cartLength: state.cart.items.reduce((acc, item) => acc + item.qty, 0),
	cartSubtotal: state.cart.items
		.reduce((acc, item) => acc + item.price * item.qty, 0)
		.toFixed(2),
	cartAddLoading: state.cart.add.loading,
	cartRemoveLoading: state.cart.remove.loading,
	cartChangeQtyLoading: state.cart.changeQty.loading,
	checkoutLoading: state.checkout.loading,
	cartIsOpen: state.cart.isOpen,
});

const productsListVariants = {
	show: {
		transition: { staggerChildren: 0.07, delayChildren: 0.2 },
	},
	hidden: {
		transition: { staggerChildren: 0.05, staggerDirection: -1 },
	},
};

const CartSidebar = ({}: pageProps) => {
	const { user, loading, isLogged } = useAuth();
	const {
		cart,
		cartLength,
		cartSubtotal,
		cartAddLoading,
		cartRemoveLoading,
		cartChangeQtyLoading,
		checkoutLoading,
		cartIsOpen,
	} = useSelector(mapState);
	const { push } = useRouter();
	const dispatch = useDispatch();

	const createCheckout = useCallback(async () => {
		dispatch(createCheckoutSession({ email: user.email, cartItems: cart }));
	}, [dispatch, cart, user]);

	const checkoutHandler = useCallback(() => {
		isLogged ? createCheckout() : push("/sign-in");
	}, [isLogged, createCheckout, push]);

	const toggleCartHandler = useCallback(() => {
		dispatch(toggleCart(cartIsOpen ? false : true));
	}, [dispatch, cartIsOpen]);

	return (
		<>
			<Sidebar
				slideFrom="Right"
				isOpen={cartIsOpen}
				onClose={toggleCartHandler}
				headerText={`MY BASKET ${cartLength >= 1 ? `(${cartLength})` : ""}`}
			>
				{loading ? (
					<SpinnerLoading style={{ margin: "auto" }} color="primary" />
				) : cart.length === 0 ? (
					<EmptyBasketContainer>
						<EmptyPageHeader
							Icon={LocalMallIcon}
							title="Your basket is empty"
						/>
					</EmptyBasketContainer>
				) : (
					<>
						{checkoutLoading && (
							<LoadingOverlay loading={checkoutLoading}>
								<SpinnerLoading color="primary" />
							</LoadingOverlay>
						)}
						<ProductsList
							variants={productsListVariants}
							initial="hidden"
							animate="show"
							layout
						>
							{cart.map((product) => (
								<CartProduct
									key={product._id}
									onClose={toggleCartHandler}
									product={product}
								/>
							))}
						</ProductsList>
						<SummaryBody>
							<PriceDetailsList>
								<PriceDetailItem>
									<span>Subtotal</span>
									<span>{`$${cartSubtotal}`}</span>
								</PriceDetailItem>
								<PriceDetailItem>
									<span>Estimated Shipping</span>
									<span>FREE</span>
								</PriceDetailItem>
							</PriceDetailsList>
							<SummaryTotal>
								<span>Total</span>
								<span>{`$${cartSubtotal}`}</span>
							</SummaryTotal>
							<CustomButton
								variant="contained"
								fullWidth
								size="medium"
								onClick={checkoutHandler}
								loading={
									loading ||
									cartAddLoading ||
									cartRemoveLoading ||
									cartChangeQtyLoading ||
									checkoutLoading
								}
							>
								{isLogged
									? "Proceed to checkout"
									: `Sign in for proceed to checkout`}
							</CustomButton>
						</SummaryBody>
					</>
				)}
			</Sidebar>
		</>
	);
};

export default CartSidebar;

const appear = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const LoadingOverlay = styled.div`
	display: grid;
	place-items: center;
	position: absolute;
	inset: 0;
	background-color: rgba(0, 0, 0, 0.3);
	z-index: 3;
	transition: all 0.2s ease-in-out;
`;

const EmptyBasketContainer = styled.div`
	display: grid;
	place-items: center;
	flex: 1;
	animation: ${appear} 0.25s ease-in-out;
`;

const ProductsList = styled(motion.ul)`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	padding: 1rem 1.5rem;
	overflow-y: scroll;
	gap: 10px 0;
	animation: ${appear} 0.25s ease-in-out;

	::-webkit-scrollbar {
		width: 6px;
	}

	::-webkit-scrollbar-track {
	}

	::-webkit-scrollbar-thumb {
		background-color: rgba(80, 80, 80, 0.6);
		border-radius: 40px;
	}
`;

const SummaryBody = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem 2.1rem 1rem 1.5rem;
	margin-top: auto;
	animation: ${appear} 0.25s ease-in-out;
`;

const PriceDetailsList = styled.ul`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 6px 0;
	padding: 1rem 0;
	border-top: 1px solid ${({ theme }) => theme.background.secondary};
	border-bottom: 1px solid ${({ theme }) => theme.background.secondary};

	@media (min-width: 576px) {
		padding: 15px 0;
	}
`;

const PriceDetailItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.5rem 0;
	font-size: 1.5rem;
	font-weight: 400;
`;

const SummaryTotal = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 10px 0;
	margin-bottom: 6px;

	> span {
		font-size: 1.6rem;
		font-weight: 600;
	}

	@media (min-width: 576px) {
		padding: 1.5rem 0;
		margin-bottom: 10px;
	}
`;
