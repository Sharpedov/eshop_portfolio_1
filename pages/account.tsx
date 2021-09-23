import Head from "next/head";
import React from "react";
import { useUser } from "src/components/userProvider";
import AccountTemplate from "src/templates/account";

export default function AccountPage() {
	const { loggedOut } = useUser();

	if (loggedOut) return null;

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
