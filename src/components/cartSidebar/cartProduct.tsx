import React, { useCallback, useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { CardActionArea } from "@material-ui/core";
import QuantityProduct from "../quantityProduct";
import CustomIconButton from "../customIconButton";
import { removeFromCart } from "src/store/slices/cartSlice";
import Image from "next/image";
import { motion } from "framer-motion";

interface pageProps {
	product;
	onClose: () => void;
	even?: boolean;
}

const mapState = (state) => ({
	loadingRemove: state.cart.remove.loading,
	loadingChangeQty: state.cart.changeQty.loading,
});

const productItemVariants = {
	show: {
		y: 0,
		opacity: 1,
		transition: {
			stiffness: 1000,
			velocity: -100,
		},
	},
	hidden: {
		y: 50,
		opacity: 0,
		transition: {
			stiffness: 1000,
		},
	},
};

const CartProduct = ({ product, onClose }: pageProps) => {
	const { loadingRemove, loadingChangeQty } = useSelector(mapState);
	const { _id, title, price, images, qty } = product;
	const dispatch = useDispatch();
	const [quantity, setQty] = useState<number>(qty);
	const [loading, setLoading] = useState<boolean>(false);

	const removeFromCartHandler = useCallback(() => {
		dispatch(removeFromCart({ product }));
		setLoading(true);
	}, [dispatch, product]);

	useEffect(() => {
		!loadingRemove && setLoading(false);
	}, [loadingRemove]);

	useEffect(() => {
		setQty(qty);
	}, [qty]);

	return (
		<>
			<ProductItem
				component={motion.li}
				loading={loading}
				layout
				animate={{
					opacity: loading ? 0.65 : 1,
					scale: loading ? 0.95 : 1,
				}}
				variants={productItemVariants}
			>
				<ImageWrapper>
					<Link passHref href={`/product/${_id}`}>
						<Image
							onClick={() => onClose()}
							src={images[0]}
							alt={title}
							layout="fill"
							objectFit="cover"
						/>
					</Link>
				</ImageWrapper>
				<Content component="div">
					<ContentTop>
						<Link passHref href={`/product/${_id}`}>
							<Title onClick={() => onClose()}>{title}</Title>
						</Link>
						<Delete>
							<CustomIconButton
								size="medium"
								ariaLabel="Remove from cart"
								Icon={DeleteIcon}
								onClick={removeFromCartHandler}
								loading={loading}
							/>
						</Delete>
					</ContentTop>
					<ContentBottom>
						<Quantity>
							<QuantityProduct
								loading={loadingChangeQty}
								productId={_id}
								qty={quantity}
								setQty={setQty}
							/>
						</Quantity>

						<Price>{`$${(qty * price).toFixed(2)}`}</Price>
					</ContentBottom>
				</Content>
			</ProductItem>
		</>
	);
};

export default CartProduct;

const ProductItem = styled(CardActionArea)`
	display: flex;
	align-items: center;
	height: 90px;
	width: 100%;
	background: ${({ theme }) => theme.surface.primary};
	border-radius: 2px;
	cursor: default;

	> span {
		background: transparent;
		color: ${({ theme }) => theme.color.white};
	}
`;

const ImageWrapper = styled.div`
	position: relative;
	height: inherit;
	width: 76px;
	object-fit: cover;
	background: ${({ theme }) => theme.surface.primary};
	border-radius: 2px 0 0 2px;
	overflow: hidden;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	padding: 5px 10px;
	grid-gap: 5px 10px;
	flex: 1;

	> span {
		color: ${({ theme }) => theme.color.white};
	}
`;

const ContentTop = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	width: 100%;
`;

const ContentBottom = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	width: 100%;
`;

const Title = styled.div`
	display: flex;
	font-weight: 700;
	font-size: ${({ theme }) => `calc(${theme.font.xxs} + 2px)`};
	padding-right: 25px;
	cursor: pointer;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;

	:hover {
		color: ${({ theme }) => theme.color.primary};
	}
	@media (min-width: 480px) {
		font-size: ${({ theme }) => `calc(${theme.font.xxs} + 3px)`};
	}
	@media (min-width: 768px) {
		font-size: ${({ theme }) => `calc(${theme.font.xs} + 1px)`};
	}
`;

const Delete = styled.div`
	display: flex;
`;

const Quantity = styled.div`
	display: flex;
	align-items: flex-end;
	font-size: ${({ theme }) => `calc(${theme.font.xxs} + 2px)`};
`;

const Price = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: center;
	font-size: ${({ theme }) => `calc(${theme.font.xs}
        - 1px)`};

	@media (min-width: 768px) {
		font-size: ${({ theme }) => `calc(${theme.font.xs}
        )`};
	}
`;
