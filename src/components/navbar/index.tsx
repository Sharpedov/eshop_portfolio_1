import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import RightSideNavbar from "./rightSideNavbar";
import LeftSideNavbar from "./leftSideNavbar";
import { useRouter } from "next/router";
import DrawlerMenu from "../drawlerMenu";
import MobileNavBottom from "./mobileNavBottom";
import CartSidebar from "../cartSidebar";
import SearchInput from "../input/searchInput";
import { useDetectOutsideClick } from "src/hooks/useDetectOutsideClick";

interface pageProps {}

const Navbar = ({}: pageProps) => {
	const [isScrolling, setIsScrolling] = useState<boolean>(false);
	const { pathname, push } = useRouter();
	const drawlerMenuRef = useRef(null);
	const [drawlerIsOpen, setDrawlerIsOpen] = useDetectOutsideClick(
		drawlerMenuRef,
		false
	);

	useEffect(() => {
		if (pathname === "/") {
			const handleScroll = () =>
				window.scrollY >= 80 ? setIsScrolling(true) : setIsScrolling(false);

			document.addEventListener("scroll", handleScroll);

			return () => document.removeEventListener("scroll", handleScroll);
		}
	}, [isScrolling, pathname]);

	return (
		<>
			<div ref={drawlerMenuRef}>
				<DrawlerMenu
					isOpen={drawlerIsOpen}
					onClose={() => setDrawlerIsOpen(false)}
				/>
			</div>
			<CartSidebar />
			<MobileNavBottom />
			<Container isScrolling={pathname === "/" ? isScrolling : true}>
				<LeftSideNavbar
					toggleDrawler={() => setDrawlerIsOpen((prev) => !prev)}
				/>
				<Middle>
					<SearchInput onClick={() => push("/search")} />
				</Middle>
				<RightSideNavbar />
			</Container>
		</>
	);
};

export default Navbar;

const Container = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 15px;
	background-color: ${({ isScrolling }) =>
		isScrolling ? `rgba(0, 0, 0, 0.9)` : "rgba(0, 0, 0,0.5)"};
	height: 54px;
	position: sticky;
	top: 0;
	left: 0;
	right: 0;
	box-shadow: ${({ theme }) => theme.boxShadow.primary};
	z-index: 100;
	transition: 0.3s cubic-bezier(0.33, 1, 0.68, 1);
	gap: 0 20px;

	@media (min-width: 480px) {
		padding: 0 20px;
		height: 58px;
	}
	@media (min-width: 1024px) {
		padding: 0 25px;
	}
`;

const Middle = styled.div`
	display: none;
	min-width: 160px;
	flex: 0.4;
	transition: box-shadow 0.2s ease-in-out;

	&:hover {
		box-shadow: 0 4px 8px 3px rgba(0, 0, 0, 0.2),
			0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
	}

	@media (min-width: 768px) {
		display: flex;
	}
`;
