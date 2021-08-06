import React from "react";
import Navbar from "src/components/navbar";
import Footer from "src/components/footer";

interface pageProps {
	children: React.ReactNode;
}

const GlobalLayout = ({ children }: pageProps) => {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	);
};

export default GlobalLayout;
