import React from "react";
import styled from "styled-components";
import BannerSlider from "./bannerSlider";
import ProductsNewArrivals from "./productsNewArrivals";

import Workflow from "./workflow";

interface pageProps {}

const HomeTemplate = ({}: pageProps) => {
	return (
		<Container>
			<BannerSlider />
			<NewArrivalsRows>
				<ProductsNewArrivals />
			</NewArrivalsRows>
			<Workflow />
		</Container>
	);
};

export default HomeTemplate;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	margin-top: -54px;

	@media (min-width: 480px) {
		margin-top: -58px;
	}
`;

const NewArrivalsRows = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	min-height: 80vh;
	width: 100%;
	height: 100%;
	padding: 25px 0;
	gap: 25px;

	::before {
		content: "";
		position: absolute;
		height: 100%;
		width: 100%;
		background-image: url("/shape-left.png");
		background-repeat: no-repeat;
		background-position: bottom left;
		left: 0%;
		bottom: 50%;
		background-size: 60%;
		z-index: -1;
	}

	::after {
		content: "";
		position: absolute;
		height: 100%;
		width: 100%;
		background-image: url("/shape-right.png");
		background-repeat: no-repeat;
		background-position: bottom right;
		right: 0;
		bottom: 8%;
		background-size: 60%;
		z-index: -1;
	}

	@media (min-width: 480px) {
		::before {
			background-size: 45%;
		}

		::after {
			bottom: 7%;
			background-size: 45%;
		}
	}

	@media (min-width: 768px) {
		::before {
			bottom: 45%;
			background-size: 30%;
		}

		::after {
			bottom: 5%;
			background-size: 30%;
		}
	}

	@media (min-width: 1024px) {
		::before {
			bottom: 45%;
			background-size: 20%;
		}

		::after {
			bottom: 3%;
			background-size: 20%;
		}
	}
`;
