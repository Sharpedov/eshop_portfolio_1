import axios from "axios";
import dbConnect from "mongodb/dbConnect";
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

export async function getServerSideProps(context) {
	const { params } = context;
	const { data } = await axios
		.get(`${process.env.HOST}/api/products/${params.id}`)
		.then((res) => res.data);

	if (!data) {
		return {
			notFound: true,
		};
	}

	return { props: { data } };
}
