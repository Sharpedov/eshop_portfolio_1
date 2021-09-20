import React from "react";
import styled, { keyframes } from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useRouter } from "next/router";
import { IconButton } from "@material-ui/core";
import ProductDescription from "./productDescription";
import ProductGallery from "./productGallery";
import ProductDetailsSkeleton from "src/components/loadingSkeletons/productDefatilsSkeleton";
import UserComments from "./userComments";
import ErrorMessageBox from "src/components/errorMessageBox";

interface pageProps {
	productData;
}

const ProductDetailsTemplate = ({ productData }: pageProps) => {
	const { back } = useRouter();

	return (
		<Container>
			<Wrapper>
				<Body>
					<ProductContent>
						<ProductGallery productDetails={productData} />
						<ProductDescription productDetails={productData} />
					</ProductContent>
					<UserComments />
				</Body>

				<BackPageBtn onClick={back}>
					<ArrowBackIcon className="backPageBtn__icon" />
				</BackPageBtn>
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
	background: ${({ theme }) => theme.background.primary};
	min-height: 50vh;
`;

const Wrapper = styled.div`
	max-width: 1400px;
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

	@media ${({ theme }) => theme.breakpoints.md} {
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
		font-size: 2.5rem;
	}

	@media ${({ theme }) => theme.breakpoints.md} {
		display: none;
	}
`;
