import React from "react";
import CustomButton from "src/components/customButton";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

interface pageProps {
	orderDetails;
	setOrderDetails;
}

const OrderDetails = ({ orderDetails, setOrderDetails }: pageProps) => {
	return (
		<Container>
			<GoBackBtn>
				<CustomButton
					variant="toolkit"
					Icon={ArrowBackIcon}
					onClick={() => setOrderDetails(null)}
					size="large"
				>
					Go back
				</CustomButton>
			</GoBackBtn>
			<OrderDate>
				<h2>
					Order date <span>{orderDetails.createdAt.slice(0, 10)}</span>
				</h2>
			</OrderDate>
			<Heading>Delivery</Heading>
			<Subheading>Courier</Subheading>
			<Heading>Payment</Heading>
			<Subheading>Stripe</Subheading>
			<Heading>Order</Heading>
			<OrderList>
				{orderDetails.items.map((order) => (
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
	min-height: 60vh;
	margin-top: 15px;
	background: ${({ theme }) => theme.background.primary};
	padding: 15px;
	animation: ${appear} 0.3s linear;
`;

const GoBackBtn = styled.div`
	margin-bottom: 5px;
`;

const OrderDate = styled.div`
	display: flex;
	color: ${({ theme }) => theme.color.white};
	font-size: 2.3rem;
	padding: 15px 0;

	@media ${({ theme }) => theme.breakpoints.sm} {
		font-size: 2.5rem;
	}
	@media ${({ theme }) => theme.breakpoints.md} {
		font-size: 2.7rem;
	}
	@media ${({ theme }) => theme.breakpoints.lg} {
		font-size: 2.9rem;
	}
	> h2 {
		font-size: inherit;

		> span {
			font-size: inherit;
			opacity: 0.65;
		}
	}
`;

const Heading = styled.h2`
	padding: 15px 0;
	font-size: 1.8rem;
	color: ${({ theme }) => theme.color.white};

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

const Subheading = styled.p`
	opacity: 0.65;
	font-size: 1.5rem;
	color: ${({ theme }) => theme.color.white};
	margin-bottom: 5px;

	@media ${({ theme }) => theme.breakpoints.md} {
		font-size: 1.6rem;
	}
	@media ${({ theme }) => theme.breakpoints.lg} {
		font-size: 1.7rem;
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
	padding: 10px;
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

const OrderTitle = styled.h3`
	grid-area: title;
	color: ${({ theme }) => theme.color.white};
	font-size: calc(14px + 0.2vw);
	line-height: 1.1;
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
