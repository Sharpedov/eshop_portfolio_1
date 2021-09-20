import Head from "next/head";
import React from "react";
import AccountTemplate from "src/templates/account";

export default function AccountPage({}) {
	return (
		<>
			<Head>
				<title>Account - Eshop</title>
			</Head>
			<AccountTemplate />
		</>
	);
}

export async function getServerSideProps(context) {
	const { req, res } = context;

	if (!req.cookies.auth_refresh) {
		res.writeHead(302, { Location: "/sign-in" });
		res.end();
	}

	return { props: {} };
}
