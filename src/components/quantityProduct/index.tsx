import React, { useCallback } from "react";
import styled from "styled-components";
import { ButtonBase } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useDispatch } from "react-redux";
import SpinnerLoading from "../loadingIndicators/spinnerLoading";
import { changeQtyItem } from "src/store/slices/cartSlice";

interface pageProps {
	qty: number;
	setQty: (qty) => void;
	productId?;
	loading?: boolean;
}

const QuantityProduct = ({ qty, setQty, productId, loading }: pageProps) => {
	const dispatch = useDispatch();

	const onClickHandler = useCallback(
		(type: "sub" | "add") => {
			switch (type) {
				case "add": {
					return productId
						? dispatch(changeQtyItem({ productId: productId, qty: qty + 1 }))
						: setQty((prev) => prev + 1);
				}
				case "sub": {
					productId
						? dispatch(changeQtyItem({ productId: productId, qty: qty - 1 }))
						: setQty((prev) => prev - 1);
				}
				default:
					return;
			}
		},
		[productId, dispatch, qty, setQty]
	);

	return (
		<Container loading={loading}>
			<Symbol
				component="div"
				disabled={qty === 1}
				onClick={() => onClickHandler("sub")}
			>
				<RemoveIcon />
			</Symbol>
			<span>{qty}</span>
			<Symbol
				component="div"
				disabled={qty === 9}
				onClick={() => onClickHandler("add")}
			>
				<AddIcon />
			</Symbol>
			{loading && (
				<LoadingOverlay>
					<SpinnerLoading color="primary" size={23} />
				</LoadingOverlay>
			)}
		</Container>
	);
};

export default QuantityProduct;

const Container = styled.div`
	position: relative;
	display: grid;
	grid-auto-flow: column;
	grid-auto-columns: 1fr;
	align-items: center;
	border: 2px solid rgba(58, 60, 63, 0.7);
	min-height: 35px;
	max-height: 50px;
	height: 100%;
	min-width: 130px;
	max-width: 145px;
	width: 100%;
	opacity: ${({ loading }) => (loading ? "0.6" : "1")};

	> span {
		display: grid;
		place-items: center;
		font-size: ${({ theme }) => theme.font.xs};
		height: 100%;
		border-left: 1px solid rgba(58, 60, 63, 0.7);
		border-right: 1px solid rgba(58, 60, 63, 0.7);
	}
`;
const LoadingOverlay = styled.div`
	display: grid;
	place-items: center;
	position: absolute;
	inset: 0;
	background: rgba(0, 0, 0, 0.8);
`;

const Symbol = styled(ButtonBase)`
	display: grid;
	place-items: center;
	pointer-events: ${({ disabled }) => disabled && " none"};
	opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
	font-size: ${({ theme }) => `calc(${theme.font.xs} + 2px)`};
	transition: all 0.2s ease-in-out;
	height: 100%;

	&.Mui-disabled {
		background-color: rgba(255, 255, 255, 0.1);
	}

	:hover {
		color: ${({ theme }) => theme.color.primary};
	}
`;
