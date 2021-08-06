import React from "react";
import styled from "styled-components";
import { RiMenLine, RiMenFill, RiWomenLine, RiWomenFill } from "react-icons/ri";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import Link from "next/link";

interface pageProps {
	toggleCartSidebar: () => void;
	cartSidebarIsOpen: boolean;
}

const mapState = (state) => ({
	cartLength: state.cart.items.length >= 1,
	favLength: state.favourite.items.length >= 1,
});

const MobileNavBottom = ({
	toggleCartSidebar,
	cartSidebarIsOpen,
}: pageProps) => {
	const { asPath, pathname } = useRouter();
	const { cartLength, favLength } = useSelector(mapState);

	const mobileNavData = [
		{
			text: "Women",
			icon: RiWomenLine,
			ActiveIcon: RiWomenFill,
			href: "/products/women",
		},
		{
			text: "Men",
			icon: RiMenLine,
			ActiveIcon: RiMenFill,
			href: "/products/men",
		},
		{
			text: "Search",
			icon: SearchOutlinedIcon,
			ActiveIcon: SearchIcon,
			href: "/search",
		},
		{
			text: "Favourite",
			icon: FavoriteBorderOutlinedIcon,
			ActiveIcon: FavoriteIcon,
			href: "/favourite",
		},
		{
			text: "Cart",
			icon: LocalMallOutlinedIcon,
			ActiveIcon: LocalMallIcon,
			onClick: toggleCartSidebar,
		},
	];

	return (
		<NavbarMobileBottom>
			{mobileNavData.map((item, i) =>
				item.href ? (
					<Link
						href={item.href}
						key={`mobileNavBottom-${item.text}-${i}`}
						passHref
					>
						<StyledIconButton
							aria-label={item.text}
							active={pathname === item.href}
							onClick={item.onClick}
							badge={
								(cartLength && item.text === "Cart") ||
								(favLength && item.text === "Favourite")
							}
						>
							<item.icon className="mobileNavBottom__icon" />
							<span>{item.text}</span>
						</StyledIconButton>
					</Link>
				) : (
					<StyledIconButton
						aria-label={item.text}
						active={pathname === item.href || cartSidebarIsOpen}
						key={`mobileNavBottom-${item.text}-${i}`}
						onClick={item.onClick}
						badge={
							(cartLength && item.text === "Cart") ||
							(favLength && item.text === "Favourite")
						}
					>
						<item.icon className="mobileNavBottom__icon" />
						<span>{item.text}</span>
					</StyledIconButton>
				)
			)}
		</NavbarMobileBottom>
	);
};

export default MobileNavBottom;

const NavbarMobileBottom = styled.nav`
	position: fixed;
	right: 0;
	left: 0;
	bottom: 0;
	display: flex;
	justify-content: space-around;
	align-items: center;
	background: ${({ theme }) => theme.surface.primary};
	height: 55px;
	transition: all 0.2s ease-in;
	z-index: 110;
	overflow: hidden;
	border-top: 1px solid ${({ theme }) => theme.surface.secondary};

	@media (min-width: 768px) {
		display: none;
	}
`;

const StyledIconButton = styled(IconButton)`
	position: relative;
	color: ${({ theme }) => theme.color.white};
	transition: all 0.2s linear;
	height: 60px;
	width: 60px;
	transform: ${({ active }) =>
		active ? "scale(1.04) translateY(-1px)" : "scale(1) translateY(0px)"};

	> span {
		color: ${({ theme }) => theme.color.primary};
		display: flex;
		flex-direction: column;
		z-index: 2;

		> span {
			user-select: none;
			font-size: 11px;
			line-height: 1.3;
			color: ${({ theme, active }) =>
				active ? theme.color.primary : theme.color.white};
			letter-spacing: 0.4px;
			margin-top: 2px;
		}
	}

	.mobileNavBottom__icon {
		font-size: ${({ theme }) => `calc(${theme.font.s})`};
		color: ${({ theme, active }) =>
			active ? theme.color.primary : theme.color.white};
	}

	&::after {
		content: "";
		display: ${({ badge }) => (badge ? "block" : "none")};
		position: absolute;
		background-color: #f00;
		height: 4px;
		width: 4px;
		border-radius: 50%;
		top: 0;
		right: 0;
		transform: translate(-15px, 15px);
	}

	@media (min-width: 350px) {
		height: 70px;
		width: 70px;
	}
	@media (min-width: 380px) {
		height: 73px;
		width: 73px;
	}
`;
