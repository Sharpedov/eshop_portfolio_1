import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export default function Custom500() {
	return (
		<>
			<Head>
				<title>500 Server-side error occurred - Eshop</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Container>
				<Wrapper>
					<h1>500 - Server-side error occurred</h1>
					<Link href="/">Go to Home page</Link>
					<Image
						src="/unDraw/500_server_error"
						alt="500 - Server-side error occurred"
						width={600}
						height={475}
					/>
				</Wrapper>
			</Container>
		</>
	);
}

const Container = styled.div`
	display: grid;
	place-items: center;
	padding: 40px 20px;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 25px 0;

	> h1 {
		font-size: 26px;
	}

	@media (min-width: 1024px) {
		> h1 {
			font-size: 34px;
		}
	}
`;
