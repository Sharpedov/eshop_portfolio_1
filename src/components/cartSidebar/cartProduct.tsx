import React, { useCallback, useEffect, useRef, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { CardActionArea } from "@material-ui/core";
import QuantityProduct from "../quantityProduct";
import CustomIconButton from "../customIconButton";
import { removeFromCart } from "src/store/slices/cartSlice";

interface pageProps {
	product;
	onClose: () => void;
	even?: boolean;
}

const mapState = (state) => ({
	loadingRemove: state.cart.remove.loading,
	loadingChangeQty: state.cart.changeQty.loading,
});

const CartProduct = ({ product, onClose }: pageProps) => {
	const { loadingRemove, loadingChangeQty } = useSelector(mapState);
	const { _id, title, price, images, qty } = product;
	const dispatch = useDispatch();
	const [quantity, setQty] = useState<number>(qty);
	const basketProductRef = useRef(null);
	const [loading, setLoading] = useState<boolean>(false);

	const handleRemoveFromCart = useCallback(() => {
		dispatch(removeFromCart({ product }));
		setLoading(true);
	}, [_id, dispatch, product]);

	useEffect(() => {
		!loadingRemove && setLoading(false);
	}, [loadingRemove]);

	useEffect(() => {
		setQty(qty);
	}, [qty]);

	return (
		<>
			<ProductLi ref={basketProductRef} component="li" loading={loading}>
				<ImageWrapper>
					<Link href={`/product/${_id}`}>
						<img onClick={() => onClose()} src={images[0]} alt={title} />
					</Link>
				</ImageWrapper>
				<Content component="div">
					<ContentTop>
						<Link href={`/product/${_id}`}>
							<Title onClick={() => onClose()}>{title}</Title>
						</Link>
						<Delete>
							<CustomIconButton
								size="medium"
								ariaLabel="Remove from cart"
								Icon={DeleteIcon}
								onClick={handleRemoveFromCart}
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
			</ProductLi>
		</>
	);
};

export default CartProduct;

const ProductLi = styled(CardActionArea)`
	display: flex;
	align-items: center;
	height: 90px;
	width: 100%;
	background: ${({ theme }) => theme.surface.primary};
	border-radius: 2px;
	cursor: default;
	opacity: ${({ loading }) => (loading ? "0.65" : "1")};
	transform: ${({ loading }) => (loading ? "scale(0.95)" : "none")};
	transition: all 0.25s cubic-bezier(0.5, 1, 0.89, 1);

	> span {
		background: transparent;
		color: ${({ theme }) => theme.color.white};
	}
`;

const ImageWrapper = styled.div`
	height: inherit;
	width: 76px;
	object-fit: cover;
	background: ${({ theme }) => theme.surface.primary};

	> img {
		border-radius: 2px 0 0 2px;
		width: 100%;
		height: 100%;
		object-fit: cover;
		cursor: pointer;
	}
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
