import { Skeleton } from "@material-ui/lab";
import React from "react";
import styled from "styled-components";

interface pageProps {
	variant?: "text" | "rect" | "circle";
	height?: number;
	width?: number;
}

const CustomSkeleton = ({ variant, height, width }: pageProps) => {
	return (
		<StyledSkeleton
			variant={variant ? variant : "rect"}
			animation="wave"
			height={height}
			width={width}
		></StyledSkeleton>
	);
};

export default CustomSkeleton;

const StyledSkeleton = styled(Skeleton)`
	background: rgba(255, 255, 255, 0.061);
	height: inherit;
	width: inherit;
`;
