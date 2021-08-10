import React, { useCallback, useMemo, useRef } from "react";
import styled from "styled-components";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { RiMenLine, RiWomenLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { CSSTransition } from "react-transition-group";
import CustomButton from "../customButton";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ListAltIcon from "@material-ui/icons/ListAlt";
import SettingsIcon from "@material-ui/icons/Settings";
import { useAuth } from "../authProvider";
import { DisableScrollbar } from "src/utils/disableScrollbar";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { logout } from "src/store/slices/authSlice";
import { useDispatch } from "react-redux";

interface pageProps {
	isOpen: boolean;
	onClose: () => void;
}

const defaultDrawlerData = [
	[
		{ text: "Home", href: "/", icon: HomeIcon },
		{ text: "Favourite", href: "/favourite", icon: FavoriteIcon },
	],
	[
		{
			heading: "Clothes",
		},
		{
			text: "Women",
			href: "/products/women",
			icon: RiWomenLine,
		},
		{
			text: "Men",
			href: "/products/men",
			icon: RiMenLine,
		},
	],
	[
		{
			heading: "Account",
		},

		{
			text: "Sign In",
			href: "/sign-in",
			icon: ExitToAppIcon,
		},
		{
			text: "Create Account",
			href: "/create-account",
			icon: PersonAddIcon,
		},
	],
	[
		{
			heading: "Others",
		},

		{
			text: "Contact Us",
			href: "/contact",
			icon: ContactSupportIcon,
		},
	],
];

const userDrawlerData = [
	[
		{ text: "Home", href: "/", icon: HomeIcon },
		{ text: "Favourite", href: "/favourite", icon: FavoriteIcon },
	],
	[
		{
			heading: "Clothes",
		},
		{
			text: "Women",
			href: "/products/women",
			icon: RiWomenLine,
		},
		{
			text: "Men",
			href: "/products/men",
			icon: RiMenLine,
		},
	],
	[
		{
			heading: "Account",
		},
		{
			text: "My Account",
			href: "/account",
			icon: AccountBoxIcon,
		},
		{
			text: "History Orders",
			href: "/account?tab=1",
			icon: ListAltIcon,
		},
		{
			text: "Settings",
			href: "/account?tab=2",
			icon: SettingsIcon,
		},
		{
			text: "Log out",
			icon: PowerSettingsNewIcon,
			action: logout,
		},
	],
	[
		{
			heading: "Others",
		},

		{
			text: "Contact Us",
			href: "/contact",
			icon: ContactSupportIcon,
		},
	],
];

const DrawlerMenu = ({ isOpen, onClose }: pageProps) => {
	const { pathname, query } = useRouter();
	const { isLogged } = useAuth();
	const drawlerMenuRef = useRef(null);
	const dispatch = useDispatch();
	DisableScrollbar(isOpen);

	const drawlerFilter = useMemo(() => {
		if (isLogged) {
			return userDrawlerData;
		}
		return defaultDrawlerData;
	}, [isLogged]);

	const onClickDrawlerItemHandler = useCallback(
		(action) => {
			action && dispatch(action());
			onClose();
		},
		[dispatch, onClose]
	);

	return (
		<>
			<CSSTransition
				in={isOpen}
				timeout={{ enter: 300, exit: 350 }}
				classNames="drawlerMenu-"
				unmountOnExit={true}
			>
				<Container ref={drawlerMenuRef}>
					<HeaderBreak />
					<Drawler>
						{drawlerFilter.map((x, i) => (
							<DrawlerList key={`drawlerList-${i}`}>
								{x.map((item, i) => (
									<DrawlerItem key={`drawlerMenu-${i}`}>
										{item.heading && (
											<DrawlerHeading>{item.heading}</DrawlerHeading>
										)}
										{item.icon && (
											<CustomButton
												left
												fullWidth
												Icon={item.icon}
												href={item.href}
												isActive={
													query.tab
														? `${pathname}?tab=${query.tab}` === item.href
														: pathname === item.href
												}
												size="medium"
												onClick={() => onClickDrawlerItemHandler(item.action)}
											>
												{item.text}
											</CustomButton>
										)}
									</DrawlerItem>
								))}
							</DrawlerList>
						))}
					</Drawler>
				</Container>
			</CSSTransition>
			<Background isOpen={isOpen} onClick={() => onClose()} />
		</>
	);
};

export default DrawlerMenu;

const Background = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 98;
	visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
	opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
	transition: all 0.25s 0.05s cubic-bezier(0.5, 1, 0.89, 1);
`;

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	max-width: 250px;
	width: 100%;
	background: ${({ theme }) => theme.surface.primary};
	box-shadow: ${({ theme }) => theme.boxShadow.primary};
	z-index: 99;
	overflow-y: scroll;

	&::-webkit-scrollbar {
		display: none;
	}
`;

const HeaderBreak = styled.div`
	height: 54px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.12);

	@media (min-width: 480px) {
		height: 58px;
	}
`;

const Drawler = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${({ theme }) => theme.surface.primary};
`;

const DrawlerList = styled.div`
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid rgba(255, 255, 255, 0.12);
`;

const DrawlerHeading = styled.div`
	display: flex;
	align-items: center;
	padding: 0 20px;
	width: 100%;
	height: 48px;
	color: ${({ theme }) => theme.color.white};
	opacity: 0.65;
	font-weight: 300;
	font-size: ${({ theme }) => `calc(${theme.font.s} - 6px)`};
`;

const DrawlerItem = styled.div`
	display: grid;
`;
