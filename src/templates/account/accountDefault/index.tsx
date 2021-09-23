import React from "react";
import styled, { keyframes } from "styled-components";
import { useUser } from "src/components/userProvider";
import { CardActionArea } from "@material-ui/core";
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
	title?: string;
	textCard?: string;
}

const mapState = (state) => ({
	favouriteItems: state.favourite.items,
});

const AccountDefaultContent = ({}: pageProps) => {
	const { loading } = useUser();
	const { favouriteItems } = useSelector(mapState);

	const CardElement = ({
		component,
		IconOverlay,
		textOverlay,
		href,
		title,
		textCard,
	}: ICardElement) => (
		<Link passHref href={href}>
			<Card component={component}>
				<CardBackgroundWrapper>
					{title}
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
							title={
								favouriteItems.length === 0
									? "Your favourite list is empty"
									: "Click to visit"
							}
							textCard="Favourite List"
							component="li"
							IconOverlay={FavoriteIcon}
							textOverlay={favouriteItems.length}
							href="/favourite"
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
	min-height: 30vh;
	margin-top: 15px;
	gap: 15px;
`;

const Cards = styled.ul`
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 25px;
	animation: ${appear} 0.3s ease-in-out;

	@media ${({ theme }) => theme.breakpoints.lg} {
		grid-template-columns: repeat(2, 1fr);
	}
`;

const Card = styled(CardActionArea)`
	display: flex;
	flex-direction: column;
	height: clamp(200px, 33vw, 300px);
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
	background: rgb(23, 24, 26);
	box-shadow: 0 1px 5px -1px rgb(23 24 26 / 50%);
	border-radius: 2px;
	overflow: hidden;
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

	@media ${({ theme }) => theme.breakpoints.sm} {
		max-width: 128px;
	}
`;

const OverlayContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: calc(1.6rem + 0.5vw);
	gap: 7px;
	font-weight: 300;

	.accountDefaultCardElementOverlay__icon {
		font-size: calc(1.8rem + 0.5vw);
	}
`;

const CardText = styled.div`
	width: 100%;
	padding: 4px 0;
	font-size: 1.4rem;

	@media ${({ theme }) => theme.breakpoints.lg} {
		font-size: 1.5rem;
	}
`;
