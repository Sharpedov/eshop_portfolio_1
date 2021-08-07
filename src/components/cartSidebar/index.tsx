import React, { useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import axios from "axios";
import { useRouter } from "next/router";
import CustomButton from "../customButton";
import EmptyPageHeader from "../emptyPageHeader";
import { loadStripe } from "@stripe/stripe-js";
import Sidebar from "../sidebar";
import SpinnerLoading from "../loadingIndicators/spinnerLoading";
import { useAuth } from "../authProvider";
import { clearCart } from "src/store/slices/cartSlice";
import CartProduct from "./cartProduct";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

interface pageProps {
	isOpen: boolean;
	onClose: () => void;
}

const mapState = (state) => ({
	cart: state.cart.items,
	cartLength: state.cart.items.reduce((acc, item) => acc + item.qty, 0),
	cartSubtotal: state.cart.items
		.reduce((acc, item) => acc + item.price * item.qty, 0)
		.toFixed(2),
	cartAddLoading: state.cart.add.loading,
	cartRemoveLoading: state.cart.remove.loading,
	cartChangeQtyLoading: state.cart.changeQty.loading,
});

const CartSidebar = ({ isOpen, onClose }: pageProps) => {
	const { user, loading, isLogged } = useAuth();
	const {
		cart,
		cartLength,
		cartSubtotal,
		cartAddLoading,
		cartRemoveLoading,
		cartChangeQtyLoading,
	} = useSelector(mapState);
	const { push } = useRouter();
	const dispatch = useDispatch();

	const createCheckout = useCallback(async () => {
		const stripe = await stripePromise;

		const checkoutSession = await axios.post(
			"/api/checkout/session",
			{
				items: cart,
				email: user.email,
			},
			{ headers: { "Content-Type": "application/json" } }
		);

		const result = await stripe.redirectToCheckout({
			sessionId: checkoutSession.data.id,
		});

		if (!result.error) return dispatch(clearCart());
	}, [cart, user, dispatch]);

	const handleCheckout = useCallback(() => {
		isLogged ? createCheckout() : push("/sign-in");
		onClose();
	}, [isLogged, createCheckout, onClose, push]);

	return (
		<>
			<Sidebar
				slideFrom="Right"
				isOpen={isOpen}
				onClose={onClose}
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
						<ProductsList>
							{cart.map((product, i) => (
								<CartProduct
									key={product._id}
									onClose={onClose}
									product={product}
								/>
							))}
						</ProductsList>
						<SummaryBody>
							<DetailsList>
								<DetailsItem>
									<span>Subtotal</span>
									<span>{`$${cartSubtotal}`}</span>
								</DetailsItem>
								<DetailsItem>
									<span>Estimated Shipping</span>
									<span>FREE</span>
								</DetailsItem>
							</DetailsList>
							<SummaryTotal>
								<span>Total</span>
								<span>{`$${cartSubtotal}`}</span>
							</SummaryTotal>
							<CustomButton
								variant="contained"
								fullWidth
								size="medium"
								onClick={handleCheckout}
								loading={
									loading ||
									cartAddLoading ||
									cartRemoveLoading ||
									cartChangeQtyLoading
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

const EmptyBasketContainer = styled.div`
	display: grid;
	place-items: center;
	flex: 1;
	animation: ${appear} 0.25s ease-in-out;
`;

const EmptyBasketWrapper = styled.div`
	display: grid;
	place-items: center;

	> h2 {
		margin-top: 25px;
		font-weight: 700px;
		text-align: center;
	}
`;

const BasketIconWrap = styled.div`
	display: grid;
	place-items: center;
	padding: 18px;
	border-radius: 50%;
	border: 1px dashed ${({ theme }) => theme.color.white};

	.emptyBasket__icon {
		font-size: ${({ theme }) => `calc(${theme.font.m} + 2px)`};
	}
`;

const ProductsList = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	padding: 10px 15px;
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
	padding: 10px 21px 10px 15px;
	margin-top: auto;
	animation: ${appear} 0.25s ease-in-out;
`;

const DetailsList = styled.ul`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 6px 0;
	padding: 10px 0;
	border-top: 1px solid ${({ theme }) => theme.surface.secondary};
	border-bottom: 1px solid ${({ theme }) => theme.surface.secondary};

	@media (min-width: 576px) {
		padding: 15px 0;
	}
`;

const DetailsItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 5px 0;
`;

const SummaryTotal = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 10px 0;
	margin-bottom: 6px;

	> span {
		font-weight: 700;
	}

	@media (min-width: 576px) {
		padding: 15px 0;
		margin-bottom: 10px;
	}
`;
