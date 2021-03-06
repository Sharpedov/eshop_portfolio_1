import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { RiMenLine, RiWomenLine } from "react-icons/ri";
import { useRouter } from "next/router";
import CustomButton from "../customButton";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ListAltIcon from "@material-ui/icons/ListAlt";
import SettingsIcon from "@material-ui/icons/Settings";
import { useUser } from "../userProvider";
import { DisableScrollbar } from "src/utils/disableScrollbar";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { logout } from "src/store/slices/authSlice";
import { useDispatch } from "react-redux";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { scroller } from "react-scroll";
import { AnimatePresence, motion } from "framer-motion";

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
			text: "Local Stores",
			icon: LocationOnIcon,
			href: "/",
			scrollTo: "googleMapLocalStores",
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
			text: "Local Stores",
			icon: LocationOnIcon,
			href: "/",
			scrollTo: "googleMapLocalStores",
		},
		{
			text: "Contact Us",
			href: "/contact",
			icon: ContactSupportIcon,
		},
	],
];

const backdropAnimation = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
	},
};
const containerAnimation = {
	hidden: {
		x: "-100%",
	},
	show: {
		x: "0",
	},
	transition: {
		type: "spring",
		bounce: 0,
		duration: 0.5,
	},
};

const DrawlerMenu = ({ isOpen, onClose }: pageProps) => {
	const { pathname, query, push } = useRouter();
	const { isLogged } = useUser();
	const dispatch = useDispatch();
	DisableScrollbar(isOpen);

	const drawlerFilter = useMemo(() => {
		if (isLogged) {
			return userDrawlerData;
		}
		return defaultDrawlerData;
	}, [isLogged]);

	const onClickDrawlerItemHandler = useCallback(
		(item) => {
			item.href &&
				push(item.href).then(
					() =>
						item.scrollTo &&
						scroller.scrollTo(item.scrollTo, {
							duration: 750,
							delay: 50,
							spy: true,
							smooth: true,
							offset: -58,
						})
				);
			item.action && dispatch(item.action());

			onClose();
		},
		[dispatch, onClose, push]
	);

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<Backdrop
						variants={backdropAnimation}
						initial="hidden"
						animate="show"
						exit="hidden"
						onClick={() => onClose()}
					/>
					<Container
						variants={containerAnimation}
						initial="hidden"
						animate="show"
						exit="hidden"
						transition="transition"
					>
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
													isActive={
														!item.scrollTo && query.tab
															? `${pathname}?tab=${query.tab}` === item.href
															: !item.scrollTo && pathname === item.href
													}
													size="medium"
													onClick={() => onClickDrawlerItemHandler(item)}
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
				</>
			)}
		</AnimatePresence>
	);
};

export default DrawlerMenu;

const Backdrop = styled(motion.div)`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 98;
`;

const Container = styled(motion.div)`
	position: fixed;
	display: flex;
	flex-direction: column;
	top: 0;
	left: 0;
	right: 0;
	bottom: 55px;
	max-width: 250px;
	width: 100%;
	background: ${({ theme }) => theme.background.primary};
	box-shadow: ${({ theme }) => theme.boxShadow.primary};
	z-index: 99;
	overflow-y: scroll;

	&::-webkit-scrollbar {
		display: none;
	}

	@media ${({ theme }) => theme.breakpoints.md} {
		bottom: 0;
	}
`;

const HeaderBreak = styled.div`
	min-height: 54px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.12);

	@media ${({ theme }) => theme.breakpoints.sm} {
		min-height: 58px;
	}
`;

const Drawler = styled.div`
	display: flex;
	flex-direction: column;
	background: ${({ theme }) => theme.background.primary};
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
