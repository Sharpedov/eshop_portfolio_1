import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import ProductDetailsTemplate from "src/templates/productDetails";

export default function ProductPage({ data }) {
	return (
		<>
			<Head>
				<title>{`${data.title}`} - Eshop</title>
			</Head>
			<ProductDetailsTemplate productData={data} />
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { params } = context;
	const response = await fetch(`${process.env.HOST}/api/products/${params.id}`);
	const { data } = await response.json();

	if (!data) {
		return {
			notFound: true,
		};
	}

	return { props: { data } };
};
