import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import styled, { keyframes } from "styled-components";

interface pageProps {}

const ProductDetailsSkeleton = ({}: pageProps) => {
	return (
		<>
			<Gallery>
				<Slider>
					<StyledSkeleton
						variant="rect"
						animation="wave"
						height="800px"
						width="100%"
					/>
				</Slider>
				<Thumbnails>
					{[1, 2, 3, 4, 5, 6].map((_, i) => (
						<StyledSkeleton
							key={`productGalleryThumnbailLoading-${i}`}
							variant="rect"
							animation="wave"
							height={90}
							width="100%"
						/>
					))}
				</Thumbnails>
			</Gallery>
			<Content>
				<StyledSkeleton
					variant="pulse"
					animation="wave"
					height="25px"
					width="50%"
				/>
				<StyledSkeleton
					variant="rect"
					animation="wave"
					height="25px"
					width="70%"
				/>
				<StyledSkeleton
					variant="rect"
					animation="wave"
					height="25px"
					width="20%"
				/>
				<StyledSkeleton
					variant="rect"
					animation="wave"
					height="45px"
					width="50%"
				/>
				<StyledSkeleton
					variant="rect"
					animation="wave"
					height="65px"
					width="100%"
				/>

				<StyledSkeleton
					variant="rect"
					animation="wave"
					height={325}
					width={"100%"}
				/>
			</Content>
		</>
	);
};

export default ProductDetailsSkeleton;

const productDetailsGalleryAppear = keyframes`
	from {
		opacity:0;
	}
	to{
		opacity:1;
	}
`;

const StyledSkeleton = styled(Skeleton)`
	background: rgba(255, 255, 255, 0.061);

	animation: ${productDetailsGalleryAppear} 0.3s linear;
	border-radius: 3px;
`;

const Gallery = styled.div`
	display: flex;
	width: 100%;
	position: sticky;
	top: 54px;
	left: 0;

	@media (min-width: 480px) {
		top: 58px;
	}

	@media (min-width: 768px) {
		position: sticky;
		width: 100%;
		padding: 20px 0 90px 15px;
	}

	@media (min-width: 1024px) {
		display: grid;
		gap: 10px;
		grid-template-columns: 1fr;
	}
`;

const Slider = styled.div`
	position: relative;
	display: flex;
	width: 100%;
	overflow: hidden;
	margin-bottom: auto;
	max-height: 475px;

	@media (min-width: 400px) {
		max-height: 525px;
	}
	@media (min-width: 480px) {
		max-height: 600px;
	}
	@media (min-width: 768px) {
		max-height: 625px;
	}
	@media (min-width: 1024px) {
		max-height: 650px;
	}
`;

const Thumbnails = styled.div`
	display: none;
	grid-template-columns: repeat(auto-fill, 70px);
	align-items: center;
	justify-content: center;
	grid-auto-rows: 88px;
	gap: 10px;

	::-webkit-scrollbar {
		display: none;
	}

	@media (min-width: 1024px) {
		display: grid;
	}
`;

const Content = styled.div`
	display: grid;
	grid-gap: 20px;
	padding: 20px 15px 70px 15px;
	background-color: ${({ theme }) => theme.surface.primary};
	z-index: 1;

	@media (min-width: 480px) {
		padding: 20px 15px 90px 15px;
	}
	@media (min-width: 768px) {
		padding: 20px 15px 90px 15px;
	}
`;
