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

function MyApp({ Component, pageProps }) {
	return (
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
	);
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
