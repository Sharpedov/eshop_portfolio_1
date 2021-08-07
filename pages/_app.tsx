import React from "react";
import { ThemeProvider } from "styled-components";
import { Provider as ReduxProvider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import { StylesProvider } from "@material-ui/styles";
import { theme } from "styles/theme";
import GlobalStyle from "styles/GlobalStyle";
import store from "src/store/store";
import "styles/animations.css";
import NotificationProvider from "src/components/notificationProvider";
import GlobalLayout from "src/components/globalLayout";
import AuthProvider from "src/components/authProvider";
import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";

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
				<AuthProvider>
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
				</AuthProvider>
			</ReduxProvider>
		</>
	);
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
