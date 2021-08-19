import Head from "next/head";
import React from "react";
import { useAuth } from "src/components/authProvider";
import CreateAccountTemplate from "src/templates/createAccount";

export default function CreateAccount() {
	const { redirectIfLogged } = useAuth();

	redirectIfLogged("/");

	return (
		<>
			<Head>
				<title>Create Account - Eshop</title>
			</Head>
			<CreateAccountTemplate />
		</>
	);
}
