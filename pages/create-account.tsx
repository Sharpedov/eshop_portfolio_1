import Head from "next/head";
import React from "react";
import CreateAccountTemplate from "src/templates/createAccount";

export default function CreateAccount() {
	return (
		<>
			<Head>
				<title>Create Account - Eshop</title>
			</Head>
			<CreateAccountTemplate />
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
