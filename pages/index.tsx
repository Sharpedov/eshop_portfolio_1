import Head from "next/head";
import React from "react";
import HomeTemplate from "src/templates/home";

export default function Home() {
	return (
		<>
			<Head>
				<title>Home - Eshop</title>
			</Head>
			<HomeTemplate />
		</>
	);
}
