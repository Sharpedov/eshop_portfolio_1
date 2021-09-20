import Head from "next/head";
import React from "react";
import SigninTemplate from "src/templates/signin";

export default function SignIn() {
	return (
		<>
			<Head>
				<title>Sign in - Eshop</title>
			</Head>
			<SigninTemplate />
		</>
	);
}

export async function getServerSideProps(context) {
	const { req, res } = context;

	if (req.cookies.auth_refresh) {
		res.writeHead(302, { Location: "/" });
		res.end();
	}

	return { props: {} };
}
