import React from "react";
import styled, { keyframes } from "styled-components";

interface pageProps {
	marginTop?: number;
	marginBottom?: number;
}

const DefaultLoading = ({ marginTop, marginBottom }: pageProps) => {
	return (
		<Grid
			style={{
				marginTop: `${marginTop ?? 25}px`,
				marginBottom: `${marginBottom ?? 25}px`,
			}}
		>
			<span>{`｡ﾟ･（>﹏<）･ﾟ｡`}</span>
		</Grid>
	);
};

export default DefaultLoading;

const rotateSpan = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Grid = styled.div`
	display: grid;
	place-items: center;

	> span {
		color: ${({ theme }) => theme.color.white};
		font-weight: 600;
		opacity: 0.9;
		animation: ${rotateSpan} 2s linear infinite;
	}
`;
