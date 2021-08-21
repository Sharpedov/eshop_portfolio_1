import { CardActionArea } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import CustomIconButton from "../customIconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "src/store/slices/cartSlice";
import { IsInCartOrFavourite } from "src/utils/isInCartOrFavourite";
import {
	addToFavourite,
	removeFromFavourite,
} from "src/store/slices/favouriteSlice";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { useAuth } from "../authProvider";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";

interface pageProps {
	data;
}

const mapState = (state) => ({
	loadingCartAdd: state.cart.add.loading,
	loadingCartRemove: state.cart.remove.loading,
	loadingFavouriteAdd: state.favourite.add.loading,
	loadingFavouriteRemove: state.favourite.remove.loading,
});

const ProductCard = ({ data }: pageProps) => {
	const { loading, isLogged } = useAuth();
	const {
		loadingCartAdd,
		loadingCartRemove,
		loadingFavouriteAdd,
		loadingFavouriteRemove,
	} = useSelector(mapState);
	const { title, price, category, brand, images, _id } = data;
	const dispatch = useDispatch();
	const { isInCart, isInFavourite } = IsInCartOrFavourite({ id: data._id });
	const router = useRouter();
	const [cartLoading, setCartLoading] = useState<boolean>(false);
	const [favouriteLoading, setFavouriteLoading] = useState<boolean>(false);

	const addToCartHandler = useCallback(async () => {
		if (isLogged) {
			setCartLoading(true);
			if (isInCart) {
				return dispatch(removeFromCart({ product: data }));
			}
			if (!isInCart) {
				return dispatch(addToCart({ productId: _id, qty: 1 }));
			}
		}

		router.push(`/sign-in?redirect=${router.pathname}`);

		return;
	}, [data, dispatch, isInCart, _id, isLogged, router]);

	const addToFavouriteHandler = useCallback(() => {
		if (isLogged) {
			setFavouriteLoading(true);
			if (isInFavourite) {
				return dispatch(removeFromFavourite({ product: data }));
			}
			if (!isInFavourite) {
				return dispatch(addToFavourite({ productId: data._id }));
			}
		}

		router.push(`/sign-in?redirect=${router.pathname}`);

		return;
	}, [dispatch, isInFavourite, data, isLogged, router]);

	useEffect(() => {
		!loadingCartAdd && !loadingCartRemove && setCartLoading(false);
		!loadingFavouriteAdd &&
			!loadingFavouriteRemove &&
			setFavouriteLoading(false);
	}, [
		loadingCartAdd,
		loadingCartRemove,
		loadingFavouriteAdd,
		loadingFavouriteRemove,
	]);

	console.log("loadingCartAdd", loadingCartAdd);
	console.log("loadingCartRemove", loadingCartRemove);

	return (
		<Card component={motion.div} layout>
			<Link passHref href={`/product/${_id}`}>
				<ImageWrapper>
					<a href={`/product/${_id}`}>
						<Image
							draggable={false}
							src={images[0]}
							alt={title}
							layout="fill"
							objectFit="cover"
						/>
					</a>
				</ImageWrapper>
			</Link>
			<Body>
				<Content>
					<Link passHref href={`/product/${_id}`}>
						<a href={`/product/${_id}`}>
							<Title>{title}</Title>
						</a>
					</Link>
					<BrandAndPriceRow>
						<Brand>
							<span>{`${brand}`}</span>
						</Brand>
						<Price>${price.$numberDecimal ?? price}</Price>
					</BrandAndPriceRow>
				</Content>
				<Actions>
					<CustomIconButton
						onClick={addToFavouriteHandler}
						ariaLabel={
							isInFavourite
								? "Remove product from favourite list"
								: "Add product to favourite list"
						}
						size="medium"
						Icon={isInFavourite ? FavoriteIcon : FavoriteBorderIcon}
						active={isInFavourite}
						loading={favouriteLoading || loading}
					/>
					<CustomIconButton
						onClick={addToCartHandler}
						ariaLabel={
							isInCart ? "Remove product from cart" : "Add product to cart"
						}
						size="medium"
						Icon={isInCart ? RemoveShoppingCartIcon : AddShoppingCartIcon}
						active={isInCart}
						loading={cartLoading || loading}
					/>
				</Actions>
			</Body>
		</Card>
	);
};

export default ProductCard;

const productAppear = keyframes`
	from{
		opacity: 0;
		transform: scale(0.96);
	}
	to {
		opacity: 1;
		transform: none;
	}
`;

const Card = styled(CardActionArea)`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	background: ${({ theme }) => theme.background.secondary};
	border-radius: 2px;
	overflow: hidden;
	animation: ${productAppear} 0.3s linear;
	cursor: default;

	> span {
		background: transparent;
		color: ${({ theme }) => theme.color.white};
	}
`;

const ImageWrapper = styled.div`
	position: relative;
	display: flex;
	overflow: hidden;
	height: clamp(100px, 60vw, 350px);
	cursor: pointer;
	width: 100%;
	transition: height 0.15s ease-in-out;

	img {
		transition: transform 0.3s cubic-bezier(0.33, 1, 0.68, 1);
	}

	@media ${({ theme }) => theme.breakpoints.md} {
		${Card}:hover & {
			img {
				transform: scale(1.1);
			}
		}
	}
`;

const Body = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex-grow: 1;
	width: 100%;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 7px;
	padding: 10px 5px 0px 5px;
	color: ${({ theme }) => theme.color.white};
`;

const Title = styled.div`
	color: ${({ theme }) => theme.color.white};
	align-self: flex-start;
	font-size: calc(15px + 0.1vw);
	cursor: pointer;
	transition: color 0.15s ease-in-out;
	line-height: 1.2;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;

	&:hover,
	&:focus {
		color: ${({ theme }) => theme.color.primary};
	}
`;

const BrandAndPriceRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 7px;
`;

const Brand = styled.div`
	opacity: 0.65;
	font-size: calc(14px + 0.05vw);
	text-transform: capitalize;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
`;

const Price = styled.div`
	grid-area: price;
	justify-self: end;
	font-size: calc(15px + 0.1vw);
`;

const Actions = styled.div`
	display: flex;
	place-content: center space-between;
	padding: 7px 5px 10px 5px;
`;
