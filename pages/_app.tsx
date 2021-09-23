import React from "react";
import { ThemeProvider } from "styled-components";
import { Provider as ReduxProvider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import { StylesProvider } from "@material-ui/styles";
import { theme } from "styles/theme";
import GlobalStyle from "styles/GlobalStyle";
import store from "src/store/store";
import NotificationProvider from "src/components/notificationProvider";
import GlobalLayout from "src/components/globalLayout";

import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";
import UserProvider from "src/components/userProvider";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

NProgress.configure({ showSpinner: false });

const meta = {
	title: "Eshop",
	description: "You can buy there clothes and shoes",
};

function MyApp({ Component, pageProps }) {
	const { asPath } = useRouter();
	return (
		<>
			<DefaultSeo
				title={meta.title}
				description={meta.description}
				openGraph={{
					type: "website",
					title: meta.title,
					url: `https://${process.env.HOST}${asPath}`,
					description: meta.description,
					site_name: meta.title,
				}}
			/>
			<ReduxProvider store={store}>
				<UserProvider>
					<StylesProvider injectFirst>
						<ThemeProvider theme={theme}>
							<GlobalStyle />
							<NotificationProvider>
								<GlobalLayout>
									<Component {...pageProps} />
								</GlobalLayout>
							</NotificationProvider>
						</ThemeProvider>
					</StylesProvider>
				</UserProvider>
			</ReduxProvider>
		</>
	);
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
