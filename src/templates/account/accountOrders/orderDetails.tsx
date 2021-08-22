import React from "react";
import CustomButton from "src/components/customButton";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";

interface pageProps {
	selectedOrder;
	onClose;
}

const OrderDetails = ({ selectedOrder, onClose }: pageProps) => {
	return (
		<Container>
			<GoBackBtn>
				<CustomButton
					variant="toolkit"
					Icon={ArrowBackIcon}
					onClick={onClose}
					size="large"
				>
					Go back
				</CustomButton>
			</GoBackBtn>
			<Top>
				<TopRow>
					<Column>
						<LocalShippingOutlinedIcon className="orderDetailsColumn__icon" />
					</Column>
					<Column>
						<span>Delivery method</span>
						<span>Courier</span>
					</Column>
				</TopRow>
				<TopRow>
					<Column>
						<LocationOnOutlinedIcon className="orderDetailsColumn__icon" />
					</Column>
					<Column>
						<span>Adrian Piątek</span>
						<span>Pocztowa 7</span>
					</Column>
				</TopRow>
			</Top>
			<Middle>
				<MiddleRow>
					<span>Order time</span>
					<span>
						{selectedOrder.createdAt.slice(0, 10)}{" "}
						{selectedOrder.createdAt.slice(11, 19)}
					</span>
				</MiddleRow>
				<MiddleRow>
					<span>Payment method</span>
					<span>Stripe</span>
				</MiddleRow>
			</Middle>

			<OrderList>
				<Heading>Order</Heading>
				{selectedOrder.items.map((order) => (
					<OrderItem key={order._id}>
						<Link passHref href={`/product/${order._id}`}>
							<OrderImage src={order.images[0]} alt={order.title} />
						</Link>
						<OrderContent>
							<Link passHref href={`/product/${order._id}`}>
								<OrderTitle>{order.title}</OrderTitle>
							</Link>
							<OrderQty>1 qty.</OrderQty>
							<OrderPrice>${order.price}</OrderPrice>
						</OrderContent>
					</OrderItem>
				))}
			</OrderList>
			<BottomRow>
				<span>Subtotal</span>
				<span>${selectedOrder.amount}</span>
			</BottomRow>
			<BottomRow>
				<span>Shipping</span>
				<span>FREE</span>
			</BottomRow>
			<BottomRow>
				<span>Total</span>
				<span>${selectedOrder.amount}</span>
			</BottomRow>
		</Container>
	);
};

export default OrderDetails;

const appear = keyframes`
	from {
		opacity:0;
	}
	to{
		opacity:1;
	}
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 2px;
	min-height: 40vh;
	margin-top: 15px;
	background: ${({ theme }) => theme.background.primary};
	padding: 15px;
	animation: ${appear} 0.3s linear;
`;

const GoBackBtn = styled.div`
	margin-bottom: 5px;
`;

const Top = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px 0;
	margin-top: 20px;
`;

const TopRow = styled.div`
	display: flex;
`;
const Column = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0.7rem;
	gap: 5px;

	.orderDetailsColumn__icon {
		font-size: 2.2rem;
		opacity: 0.9;
	}

	> span {
		font-size: 1.4rem;
		opacity: 0.9;
	}

	@media ${({ theme }) => theme.breakpoints.md} {
		.orderDetailsColumn__icon {
			font-size: 2.4rem;
		}
		> span {
			font-size: 1.5rem;
		}
	}
`;

const Middle = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 20px;
`;

const MiddleRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1.5rem 0;
	border-top: 1px solid rgba(75, 75, 75, 0.25);

	> span {
		font-size: 1.5rem;
		opacity: 0.9;

		&:nth-child(1) {
			opacity: 0.4;
		}
	}

	@media ${({ theme }) => theme.breakpoints.md} {
		> span {
			font-size: 1.6rem;
		}
	}
`;

const Heading = styled.h2`
	padding-top: 1rem;
	font-size: 1.8rem;
	color: ${({ theme }) => theme.color.white};
	font-weight: 400;

	@media ${({ theme }) => theme.breakpoints.sm} {
		font-size: 1.9rem;
	}
	@media ${({ theme }) => theme.breakpoints.md} {
		font-size: 2.1rem;
	}
	@media ${({ theme }) => theme.breakpoints.lg} {
		font-size: 2.2rem;
	}
`;

const OrderList = styled.ul`
	display: flex;
	flex-direction: column;
	border-top: 1px solid rgba(75, 75, 75, 0.25);
`;

const OrderItem = styled.li`
	display: grid;
	grid-template-columns: 76px 1fr;
	border-bottom: 1px solid rgba(75, 75, 75, 0.25);
	padding: 1.5rem 1rem;
`;

const OrderImage = styled.img`
	display: block;
	height: 72px;
	width: 100%;
	object-fit: cover;
	cursor: pointer;
`;

const OrderContent = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: repeat(1fr);
	grid-gap: 10px;
	margin-left: 15px;
	grid-template-areas: "title title" "qty price";

	@media ${({ theme }) => theme.breakpoints.lg} {
		grid-template-columns: repeat(auto-fit, minmax(125px, 1fr));
		grid-gap: 15px;
		grid-template-areas: inherit;
	}
`;

const OrderTitle = styled.div`
	grid-area: title;
	color: ${({ theme }) => theme.color.white};
	font-size: calc(1.3rem + 0.2vw);
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	cursor: pointer;
	transition: color 0.1s ease-in-out;

	&:hover {
		color: ${({ theme }) => theme.color.primary};
	}

	@media ${({ theme }) => theme.breakpoints.lg} {
		grid-area: inherit;
	}
	@media ${({ theme }) => theme.breakpoints.xl} {
		font-size: calc(13px + 0.2vw);
	}
`;

const OrderQty = styled.div`
	grid-area: qty;
	display: grid;
	place-items: center;
	font-size: calc(13px + 0.2vw);

	@media ${({ theme }) => theme.breakpoints.lg} {
		grid-area: inherit;
	}
`;

const OrderPrice = styled.div`
	grid-area: price;
	display: grid;
	place-items: center;
	font-size: calc(13px + 0.2vw);

	@media ${({ theme }) => theme.breakpoints.lg} {
		grid-area: inherit;
	}
`;

const BottomRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 0;

	> span {
		font-size: 1.5rem;
		opacity: 0.9;

		&:nth-child(1) {
			opacity: 0.4;
		}
	}

	@media ${({ theme }) => theme.breakpoints.md} {
		> span {
			font-size: 1.6rem;
		}
	}
`;
