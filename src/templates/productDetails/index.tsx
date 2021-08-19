import React from "react";
import styled, { keyframes } from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useRouter } from "next/router";
import { IconButton } from "@material-ui/core";
import ProductDescription from "./productDescription";
import ProductGallery from "./productGallery";
import ProductDetailsSkeleton from "src/components/loadingSkeletons/productDefatilsSkeleton";
import UserComments from "./userComments";

interface pageProps {
	productData;
	productError;
}

const ProductDetailsTemplate = ({ productData, productError }: pageProps) => {
	const { back } = useRouter();

	return (
		<Container>
			<Wrapper>
				{productError && <div>{productError.message}</div>}
				<Body>
					<ProductContent>
						{!productData ? (
							<ProductDetailsSkeleton />
						) : (
							<>
								<ProductGallery
									loading={!productData}
									productDetails={productData}
								/>

								<ProductDescription
									loading={!productData}
									productDetails={productData}
								/>
							</>
						)}
					</ProductContent>
					<UserComments />
					<BackPageBtn onClick={back}>
						<ArrowBackIcon className="backPageBtn__icon" />
					</BackPageBtn>
				</Body>
			</Wrapper>
		</Container>
	);
};

export default ProductDetailsTemplate;

const appear = keyframes`
	from {
		opacity:0;
		}
	to{
		opacity:1;
	}
`;

const Container = styled.div`
	position: relative;
	background: ${({ theme }) => theme.surface.primary};
	min-height: 100vh;
`;

const Wrapper = styled.div`
	max-width: 1440px;
	width: 100%;
	margin: 0 auto;
`;

const Body = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
	margin: 0 auto;
	z-index: 2;
	position: relative;
`;

const ProductContent = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 0 20px;
	align-items: flex-start;
	width: 100%;

	@media (min-width: 768px) {
		grid-template-columns: 1fr 1fr;
	}
`;

const BackPageBtn = styled(IconButton)`
	position: fixed;
	display: flex;
	bottom: 55px;
	right: 0;
	transform: translate(-13px, -13px);
	padding: 10px;
	z-index: 5;
	background: ${({ theme }) => theme.color.primary};
	box-shadow: ${({ theme }) => theme.boxShadow.primary};
	animation: ${appear} 0.3s linear;

	> span {
		color: #fff;
	}

	&:hover {
		background: ${({ theme }) => theme.color.primary};
	}

	.backPageBtn__icon {
		color: ${({ theme }) => theme.color.white};
		font-size: 25px;
	}

	@media (min-width: 768px) {
		display: none;
	}
`;
