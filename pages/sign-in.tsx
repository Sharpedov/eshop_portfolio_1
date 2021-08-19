import Head from "next/head";
import React from "react";
import SigninTemplate from "src/templates/signin";
import { useAuth } from "src/components/authProvider";
import { useRouter } from "next/router";

export default function SignIn() {
	const { redirectIfLogged } = useAuth();
	const router = useRouter();

	redirectIfLogged(`${router.query.redirect ?? "/"}`);

	return (
		<>
			<Head>
				<title>Sign in - Eshop</title>
			</Head>
			<SigninTemplate />
		</>
	);
}
