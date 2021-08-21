import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import styled, { keyframes } from "styled-components";

interface pageProps {}

const ProductSkeleton = ({}: pageProps) => {
	return (
		<StyledProduct>
			<StyledImgWrap>
				<StyledSkeleton
					animation="wave"
					height="100%"
					width="100%"
					variant="rect"
				/>
			</StyledImgWrap>
		</StyledProduct>
	);
};

export default ProductSkeleton;

const productSkeletonAppear = keyframes`
    from {
        opacity: 0;
        transform: scale(0.92);
    }
    to {
        opacity: 1;
			transform: none;
    }
`;

const StyledProduct = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 450px;
	margin: 0 auto;
	animation: ${productSkeletonAppear} 0.3s linear both;
`;

const StyledImgWrap = styled.div`
	position: relative;
	border-radius: 3px;
	height: 350px;
	overflow: hidden;

	@media (min-width: 768px) {
		height: 480px;
	}
`;

const StyledName = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;

const StyledBrand = styled.div`
	display: flex;
	width: 60%;
`;

const StyledSkeleton = styled(Skeleton)`
	background: rgba(255, 255, 255, 0.061);
`;
