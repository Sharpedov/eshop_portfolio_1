import React, { useCallback, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DescriptionIcon from "@material-ui/icons/Description";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CustomButton from "src/components/customButton";
import { addToCart } from "src/store/slices/cartSlice";
import { IsInCartOrFavourite } from "src/utils/isInCartOrFavourite";
import QuantityProduct from "src/components/quantityProduct";
import CustomIconButton from "src/components/customIconButton";
import {
	addToFavourite,
	removeFromFavourite,
} from "src/store/slices/favouriteSlice";
import Tabs from "src/components/tabs";
import { useAuth } from "src/components/authProvider";
import { useRouter } from "next/router";

interface pageProps {
	productDetails;
	loading: boolean;
}

const TabsData = [
	{
		title: "Description",
		icon: DescriptionIcon,
	},
	{
		title: "Des",
	},
	{
		title: "Shipment",
		icon: LocalShippingIcon,
	},
];

const mapState = (state) => ({
	loadingCartAdd: state.cart.add.loading,
	loadingCartRemove: state.cart.remove.loading,
	loadingFavouriteAdd: state.favourite.add.loading,
	loadingFavouriteRemove: state.favourite.remove.loading,
});

const ProductDescription = ({ productDetails, loading }: pageProps) => {
	const {
		loadingCartAdd,
		loadingCartRemove,
		loadingFavouriteAdd,
		loadingFavouriteRemove,
	} = useSelector(mapState);
	const { loading: loadingUser, isLogged } = useAuth();
	const dispatch = useDispatch();
	const [qty, setQty] = useState<number>(1);
	const [currentTab, setCurrentTab] = useState<number>(0);
	const contentSliderRef = useRef(null);
	const { isInFavourite } = IsInCartOrFavourite({
		id: productDetails?._id,
	});
	const router = useRouter();

	const handleAddToFavourite = useCallback(() => {
		if (isLogged) {
			if (isInFavourite) {
				return dispatch(removeFromFavourite({ product: productDetails }));
			}
			if (!isInFavourite) {
				return dispatch(addToFavourite({ productId: productDetails._id }));
			}
		}

		router.push(`/sign-in?redirect=${router.asPath}`);
		return;
	}, [isInFavourite, dispatch, productDetails, isLogged, router]);

	const handleAddToCart = useCallback(() => {
		if (isLogged) {
			return dispatch(addToCart({ productId: productDetails._id, qty }));
		}

		router.push(`/sign-in?redirect=${router.asPath}`);
		return;
	}, [dispatch, productDetails, qty, isLogged, router]);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setCurrentTab(newValue);
	};

	return (
		<Container>
			<Brand>
				<span>{`${productDetails?.gender} / ${productDetails?.brand} / ${productDetails?.category}`}</span>
			</Brand>
			<Title>
				<h2>{productDetails?.title}</h2>
			</Title>
			<Price>
				<h3>{`$${productDetails.price}`}</h3>
			</Price>
			<Actions>
				<QuantityProduct qty={qty} setQty={setQty} />
				<CustomButton
					variant="contained"
					onClick={handleAddToCart}
					loading={loadingCartAdd || loadingCartRemove || loadingUser}
				>
					Add to Cart
				</CustomButton>
				<AddToFavIcon>
					<CustomIconButton
						ariaLabel={
							isInFavourite ? "Remove from favourite" : "Add to favourite"
						}
						active={isInFavourite}
						onClick={handleAddToFavourite}
						Icon={isInFavourite ? FavoriteIcon : FavoriteBorderIcon}
						loading={
							loadingFavouriteAdd || loadingFavouriteRemove || loadingUser
						}
					/>
				</AddToFavIcon>
			</Actions>

			<Tabs
				tabs={TabsData}
				currentTab={currentTab}
				setCurrentTab={setCurrentTab}
			/>

			<ContentWrapper style={{ overflow: "hidden" }}>
				<ContentSlider
					ref={contentSliderRef}
					style={{
						transform: `translateX(calc(-${currentTab * 100}%))`,
					}}
				>
					<ContentSlide>
						{currentTab === 0 && (
							<>
								100% Bawełna
								<br />
								<br />
								Dopasowany krój
								<br />
								<br />
								Polska produkcja i materiał
								<br />
								<br />
								Luminescencyjny haft
								<br />
								<br />
								Zalecamy delikatne pranie ręczne na lewej stronie
								<br />
								<br />
								Gramatura 280g 100% Bawełna
								<br />
								<br />
								Dopasowany krój
								<br />
								<br />
								Polska produkcja i materiał
								<br />
								<br />
								Luminescencyjny haft
								<br />
								<br />
								Zalecamy delikatne pranie ręczne na lewej stronie
								<br />
								<br />
								Gramatura 280g
								<br />
								<br />
								{productDetails?.description}
							</>
						)}
					</ContentSlide>
					<ContentSlide>
						{currentTab === 1 && (
							<>
								b<br />
								b<br />
								b<br />
								b<br />
								b<br />
							</>
						)}
					</ContentSlide>
					<ContentSlide>
						{currentTab === 2 && (
							<>
								c<br />
								c<br />
								c<br />
								c<br />
							</>
						)}
					</ContentSlide>
				</ContentSlider>
			</ContentWrapper>
		</Container>
	);
};

export default ProductDescription;

const appear = keyframes`
	from {
		opacity:0;
		}
	to{
		opacity:1;
	}
`;

const Container = styled.div`
	position: relative;
	display: grid;
	grid-gap: 20px;
	padding: 20px 8px 70px 8px;
	background-color: ${({ theme }) => theme.surface.primary};
	z-index: 1;

	@media (min-width: 480px) {
		padding: 20px 8px 90px 8px;
	}
	@media (min-width: 768px) {
		padding: 20px 15px 90px 15px;
	}
`;

const Brand = styled.div`
	display: flex;
	flex-direction: column;
	color: ${({ theme }) => theme.color.white};
	animation: ${appear} 0.3s linear;

	> span {
		opacity: 0.65;
		text-transform: capitalize;
		letter-spacing: 1px;
		font-size: ${({ theme }) => `calc(${theme.font.xs} - 1px)`};
	}
`;

const AddToFavIcon = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	transform: translateY(calc(-100% + 1px));
	background: ${({ theme }) => theme.surface.primary};
	padding: 3px;

	@media (min-width: 768px) {
		position: static;
		top: none;
		right: none;
		transform: none;
	}
`;

const Title = styled.div`
	display: flex;
	flex-direction: column;
	animation: ${appear} 0.3s linear;

	> h2 {
		font-size: calc(18px + 1vw);
	}
`;

const Price = styled.div`
	display: flex;
	flex-direction: column;
	animation: ${appear} 0.3s linear;

	> h3 {
		font-size: calc(15px + 1vw);
	}
`;

const Actions = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 15px;
	z-index: 3;
	animation: ${appear} 0.3s linear;
`;

const ContentWrapper = styled.div`
	border-radius: 2px;
	animation: ${appear} 0.3s linear;
`;

const ContentSlider = styled.div`
	display: flex;
	align-items: flex-start;
	transition: all 0.2s cubic-bezier(0.5, 1, 0.89, 1);
`;

const ContentSlide = styled.div`
	min-width: 100%;
	padding: 10px;
`;
