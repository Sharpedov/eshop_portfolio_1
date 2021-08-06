import React from "react";
import styled, { keyframes } from "styled-components";
import { useAuth } from "src/components/authProvider";
import { CardActionArea } from "@material-ui/core";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useSelector } from "react-redux";
import DefaultLoading from "src/components/loadingIndicators/defaultLoading";
import Link from "next/link";

interface pageProps {}

interface ICardElement {
	component: string;
	textOverlay: string;
	IconOverlay;
	href: string;
	background: string;
	emptyCard?: string;
	textCard?: string;
}

const mapState = (state) => ({
	favouriteItems: state.favourite.items,
});

const AccountDefaultContent = ({}: pageProps) => {
	const { user, loading } = useAuth();
	const { favouriteItems } = useSelector(mapState);

	const CardElement = ({
		component,
		IconOverlay,
		textOverlay,
		href,
		background,
		emptyCard,
		textCard,
	}: ICardElement) => (
		<Link href={href}>
			<Card component={component}>
				<CardBackgroundWrapper>
					<CardBackground background={background} />
					{emptyCard}
					<CardOverlay>
						<OverlayContent>
							{textOverlay}
							<IconOverlay className="accountDefaultCardElementOverlay__icon" />
						</OverlayContent>
					</CardOverlay>
				</CardBackgroundWrapper>
				<CardText>{textCard}</CardText>
			</Card>
		</Link>
	);

	return (
		<>
			<Body>
				{loading ? (
					<DefaultLoading marginTop={50} marginBottom={60} />
				) : (
					<Cards>
						<CardElement
							textCard="Favourite List"
							emptyCard={
								favouriteItems.length === 0 && "Your favourite list is empty"
							}
							component="li"
							IconOverlay={FavoriteIcon}
							textOverlay={favouriteItems.length}
							href="/favourite"
							background={favouriteItems[0]?.images[0]}
						/>
					</Cards>
				)}
			</Body>
		</>
	);
};

export default AccountDefaultContent;

const appear = keyframes`
	from {
		opacity:0;
	}
	to{
		opacity:1;
	}
`;

const Body = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-radius: 2px;
	min-height: 60vh;
	margin-top: 15px;
	gap: 15px;
`;

const Cards = styled.ul`
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 25px;
	animation: ${appear} 0.3s ease-in-out;

	@media (min-width: 1024px) {
		grid-template-columns: repeat(2, 1fr);
	}
`;

const Card = styled(CardActionArea)`
	display: flex;
	flex-direction: column;
	height: clamp(200px, 33vw, 310px);
	border-radius: 2px;

	> span {
		background: transparent;
	}
`;

const CardBackgroundWrapper = styled.div`
	position: relative;
	display: grid;
	place-items: center;
	font-size: 15px;
	height: 100%;
	width: 100%;
	box-shadow: 0 1px 5px -1px rgb(23 24 26 / 50%);
	border-radius: 2px;
	overflow: hidden;
`;

const CardBackground = styled.div`
	position: absolute;
	inset: 0;
	background: ${({ background }) =>
		`url(${background}) center / cover no-repeat rgb(23, 24, 26)`};
	/* background-size: cover;
	background-position: center;
	background-repeat: no-repeat; */
	transition: all 0.2s ease-in-out;
	z-index: -1;

	&::after {
		content: "";
		position: absolute;
		inset: 0;
		background: rgb(0, 0, 0, 0.1);
	}
`;

const CardOverlay = styled.div`
	position: absolute;
	display: grid;
	place-items: center;
	background: rgba(17, 17, 17, 0.75);
	max-width: 114px;
	width: 100%;
	inset: 0;
	left: auto;

	@media (min-width: 480px) {
		max-width: 128px;
	}
`;

const OverlayContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: calc(16px + 0.5vw);
	gap: 7px;
	font-weight: 300;

	.accountDefaultCardElementOverlay__icon {
		font-size: calc(18px + 0.5vw);
	}
`;

const CardText = styled.div`
	width: 100%;
	padding: 7px 0;
	font-size: 16px;

	@media (min-width: 1024px) {
		font-size: 17px;
	}
`;
