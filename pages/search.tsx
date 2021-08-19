import Head from "next/head";
import React from "react";
import SearchProductsTemplate from "src/templates/searchProducts";

export default function Home() {
	return (
		<>
			<Head>
				<title>Search - Eshop</title>
			</Head>
			<SearchProductsTemplate />
		</>
	);
}
