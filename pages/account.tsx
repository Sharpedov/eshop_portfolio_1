import Head from "next/head";
import React from "react";
import { useAuth } from "src/components/authProvider";
import cookie from "cookie";
import AccountTemplate from "src/templates/account";

export default function AccountPage({}) {
	const { redirectIfNotLogged } = useAuth();

	// redirectIfNotLogged("/");

	// useEffect(() => {
	// 	if (!isLogged && !loading) router.push("/");
	// }, [isLogged, router, loading]);

	return (
		<>
			<Head>
				<title>Account - Eshop</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<AccountTemplate />
		</>
	);
}

export async function getServerSideProps(context) {
	const { req, res } = context;
	const cookies = cookie.parse(req.headers.cookie || "");

	if (!cookies.auth) {
		res.writeHead(302, { Location: "/sign-in" });
		res.end();
		return;
	}

	return { props: {} };
}

// export async function getServerSideProps(context) {
// 	const { req, res } = context;
// 	// const session = await getSession({ req });
// 	const cookies = cookie.parse(req.headers.cookie || "");

// 	const user =
// 		cookies.auth &&
// 		(await axios
// 			.get(`${process.env.HOST}/api/users?id=${cookies.auth}`)
// 			.then((res) => res.data));

// 	// const user = (session && session.user) || resp;

// 	if (!user) {
// 		res.writeHead(302, { Location: "/" });
// 		res.end();
// 		return;
// 	}

// 	return { props: { user } };
// }
