import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
	return (
		<>
			<Head>
				<title>404 Page Not Found - Eshop</title>
			</Head>
			<Container>
				<Wrapper>
					<h1>404 - Page Not Found</h1>
					<Link href="/">Go to Home page</Link>
					<Image
						src="/unDraw/404_not_found.svg"
						alt="404 - Page Not Found"
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
