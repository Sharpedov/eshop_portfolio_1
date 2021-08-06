import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

interface pageProps {
	color?: "default" | "primary";
	size?: number;
	style?: {};
}

const SpinnerLoading = ({ color, size, style }: pageProps) => {
	return <Spinner style={style} color={color} size={size}></Spinner>;
};

export default SpinnerLoading;

const Spinner = styled(CircularProgress)`
	color: ${({ theme, color }) =>
		color === "primary" ? theme.color.primary : "rgba(80, 80, 80, 0.75)"};
`;
