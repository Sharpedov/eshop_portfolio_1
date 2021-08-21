import React from "react";
import styled, { keyframes } from "styled-components";
import { CardActionArea } from "@material-ui/core";
import { Link as LinkScroll } from "react-scroll";
import Image from "next/image";

interface pageProps {
	orderData;
	setOrderDetails;
}

const OrderCard = ({ orderData, setOrderDetails }: pageProps) => {
	const { amount, amount_shipping, createdAt, items } = orderData;

	return (
		<LinkScroll
			to="accountOrdersBody"
			spy={true}
			smooth={true}
			offset={-70}
			duration={500}
		>
			<Container onClick={() => setOrderDetails(orderData)}>
				<LeftBox>
					<h2>In progress</h2>
					<span>{createdAt.slice(0, 10)}</span>
					<span>{createdAt.slice(11, 19)}</span>
					<p>${amount}</p>
				</LeftBox>
				<RightBox>
					<Images>
						{items.map((item) => (
							<>
								{item.images[0] ? (
									<ImageWrapper key={item._id}>
										<Image
											src={item.images[0]}
											alt={item.title}
											layout="fill"
											objectFit="cover"
										/>
									</ImageWrapper>
								) : (
									<ImageWrapper key={item._id}>
										<Image
											src="/empty-img.png"
											alt={item.title}
											layout="fill"
											objectFit="cover"
										/>
									</ImageWrapper>
								)}
							</>
						))}
					</Images>
				</RightBox>
			</Container>
		</LinkScroll>
	);
};

export default OrderCard;

const appear = keyframes`
		from {
		opacity:0;
	}
	to{
		opacity:1;
	}
`;

const Container = styled(CardActionArea)`
	display: grid;
	grid-template-columns: 2fr 3fr;
	border-radius: 2px;
	animation: ${appear} 0.3s linear;

	> span {
		background: transparent;
	}

	@media ${({ theme }) => theme.breakpoints.sm} {
		grid-template-columns: minmax(125px, 250px) 1fr;
	}
`;

const LeftBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background: ${({ theme }) => theme.background.primary};
	padding: 15px;
	color: ${({ theme }) => theme.color.white};

	> h2 {
		font-size: ${({ theme }) => theme.font.xs};
		margin-bottom: 15px;
	}
	> p {
		font-size: ${({ theme }) => theme.font.xs};
		margin-top: 15px;
	}
	> span {
		font-size: ${({ theme }) => `calc(${theme.font.xxs} + 2px)`};

		opacity: 0.65;
	}
`;

const RightBox = styled.div`
	display: flex;
	align-items: center;
	padding: 15px;
	height: 100%;
	width: 100%;
	overflow-x: scroll;
	background: ${({ theme }) => `${theme.background.primary + "a0"}`};

	::-webkit-scrollbar {
		display: none;
	}
`;

const Images = styled.div`
	display: grid;
	grid-auto-flow: column;
	grid-auto-columns: minmax(60px, 75px);
	width: 100%;
	gap: 10px;
	grid-auto-flow: column;

	> img {
		display: block;
		width: 100%;
		height: 100%;
		max-height: 80px;
		object-fit: cover;
	}
`;

const ImageWrapper = styled.div`
	position: relative;
	height: 80px;
	width: 100%;
`;
