import Head from "next/head";
import React from "react";
import styled from "styled-components";

export default function Contact({}) {
	return (
		<>
			<Head>
				<title>Contact - Eshop</title>
			</Head>
			<Container>
				<Wrapper>
					<Heading>
						<h2>Contact</h2>
					</Heading>
				</Wrapper>
			</Container>
		</>
	);
}

const Container = styled.div`
	position: relative;
	background: ${({ theme }) => theme.background.primary};
	min-height: 70vh;
	padding: 20px 15px;

	@media (min-width: 480px) {
		padding: 20px 20px;
	}
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 1440px;
	width: 100%;
	margin: 0 auto;

	> img {
		position: absolute;
		bottom: 0;
		right: 0;
		display: block;
		width: 90%;
		height: 300px;
		object-fit: contain;
	}

	@media (min-width: 768px) {
		> img {
			width: 40%;
		}
	}
`;

const Heading = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	> h2 {
		font-size: ${({ theme }) => `calc(${theme.font.xs} + 3vw)`};
	}
`;
