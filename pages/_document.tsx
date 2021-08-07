import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class CustomDocument extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props} />),
				});

			const inistialProps = await Document.getInitialProps(ctx);

			return {
				...inistialProps,
				styles: (
					<>
						{inistialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}

	render() {
		return (
			<Html lang="en-US">
				<Head>
					<meta name="apple-mobile-web-app-title" content="Eshop ecommerce" />

					<link rel="preconnect" href="https://fonts.gstatic.com" />

					<link
						href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
						rel="stylesheet"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap"
						rel="stylesheet"
					/>

					<link
						href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<Main />
					<div id="modal" />

					<NextScript />
				</body>
			</Html>
		);
	}
}
