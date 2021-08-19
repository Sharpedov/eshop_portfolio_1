import Head from "next/head";
import React from "react";
import ProductsTemplate from "src/templates/products";

export default function ProductsByGender() {
	return (
		<>
			<Head>
				<title>Women products - Eshop</title>
			</Head>
			<ProductsTemplate gender="women" />
		</>
	);
}
