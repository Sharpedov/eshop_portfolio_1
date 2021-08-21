import React, { useCallback } from "react";
import styled from "styled-components";
import { RiMenLine, RiMenFill, RiWomenLine, RiWomenFill } from "react-icons/ri";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import Link from "next/link";
import { toggleCart } from "src/store/slices/cartSlice";

interface pageProps {}

const mapState = (state) => ({
	cartLength: state.cart.items.length >= 1,
	favLength: state.favourite.items.length >= 1,
	cartIsOpen: state.cart.isOpen,
});

const MobileNavBottom = ({}: pageProps) => {
	const { pathname } = useRouter();
	const { cartLength, favLength, cartIsOpen } = useSelector(mapState);
	const dispatch = useDispatch();

	const toggleCartHandler = useCallback(() => {
		dispatch(toggleCart(cartIsOpen ? false : true));
	}, [dispatch, cartIsOpen]);

	const mobileNavData = [
		{
			text: "Women",
			icon: RiWomenLine,
			ActiveIcon: RiWomenFill,
			href: "/products/women",
			onClick: () => dispatch(toggleCart(false)),
		},
		{
			text: "Men",
			icon: RiMenLine,
			ActiveIcon: RiMenFill,
			href: "/products/men",
			onClick: () => dispatch(toggleCart(false)),
		},
		{
			text: "Search",
			icon: SearchOutlinedIcon,
			ActiveIcon: SearchIcon,
			href: "/search",
			onClick: () => dispatch(toggleCart(false)),
		},
		{
			text: "Favourite",
			icon: FavoriteBorderOutlinedIcon,
			ActiveIcon: FavoriteIcon,
			href: "/favourite",
			onClick: () => dispatch(toggleCart(false)),
		},
		{
			text: "Cart",
			icon: LocalMallOutlinedIcon,
			ActiveIcon: LocalMallIcon,
			onClick: toggleCartHandler,
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
						active={pathname === item.href || cartIsOpen}
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
	background: ${({ theme }) => theme.background.primary};
	height: 55px;
	transition: all 0.2s ease-in;
	z-index: 110;
	overflow: hidden;
	border-top: 1px solid ${({ theme }) => theme.background.secondary};

	@media ${({ theme }) => theme.breakpoints.md} {
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
			font-size: 1.1rem;
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
