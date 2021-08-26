import React from "react";
import styled from "styled-components";

interface pageProps {
	message: string;
}

const ErrorMessageBox = ({ message }) => {
	return (
		<Container>
			<span>{message}</span>
		</Container>
	);
};

export default ErrorMessageBox;

const Container = styled.div`
	background: rgba(233, 96, 96, 0.65);
	border: 1px solid rgb(233, 96, 96);
	color: ${({ theme }) => theme.color.white};
	border-radius: 4px;
	padding: 0.5rem 1rem;
	width: 90%;
	margin: 20px auto 0;

	> span {
		font-size: 1.6rem;
	}
`;
