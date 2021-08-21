import React, { useCallback } from "react";
import styled from "styled-components";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { useRouter } from "next/router";
import CustomButton from "../customButton";
import UserAvatar from "./userAvatar";
import { useDispatch } from "react-redux";
import SettingsIcon from "@material-ui/icons/Settings";
import { logout } from "src/store/slices/authSlice";
import { AnimatePresence, motion } from "framer-motion";

interface pageProps {
	user;
	isOpen: boolean;
	onClose: () => void;
}

const MenuList = [
	{
		text: "My account",
		icon: AccountBoxIcon,
		href: "/account",
	},
	{
		text: "Orders History",
		icon: ListAltIcon,
		href: "/account?tab=1",
	},
	{
		text: "Settings",
		icon: SettingsIcon,
		href: "/account?tab=2",
	},

	{
		text: "Log out",
		icon: PowerSettingsNewIcon,
		action: () => logout(),
	},
];

const containerAnimation = {
	show: {
		opacity: 1,
		y: "0",
		transition: { duration: 0.2 },
	},
	hidden: {
		opacity: 0,
		y: "-10px",
		transition: { duration: 0.25 },
	},
};

const UserDropdownNavMenu = ({ user, isOpen, onClose }: pageProps) => {
	const { push } = useRouter();
	const dispatch = useDispatch();

	const onClickHandler = useCallback(
		(item) => {
			item.href && push(item.href);
			item.action && dispatch(item.action());
			onClose();
		},
		[onClose, push, dispatch]
	);

	return (
		<AnimatePresence>
			{isOpen && (
				<Container
					variants={containerAnimation}
					initial="hidden"
					animate="show"
					exit="hidden"
				>
					<Header>
						<AvatarWrapper>
							<UserAvatar src={user.avatar} width={48} />
						</AvatarWrapper>
						<UserInfo>
							<h3>{user.username}</h3>
							<h4>{user.email}</h4>
						</UserInfo>
					</Header>
					<Body>
						{MenuList.map((item, i) => (
							<CustomButton
								key={`${item.text}-${i}`}
								Icon={item.icon}
								fullWidth
								left
								size="medium"
								onClick={() => onClickHandler(item)}
							>
								{item.text}
							</CustomButton>
						))}
					</Body>
				</Container>
			)}
		</AnimatePresence>
	);
};

export default UserDropdownNavMenu;

const Container = styled(motion.nav)`
	position: absolute;
	top: calc(100% - 3px);
	display: flex;
	flex-direction: column;
	right: 0;
	border-radius: 2px;
	background: ${({ theme }) => theme.background.secondary};
	width: 255px;
	box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
		0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
	overflow: hidden;
	z-index: 103;
`;

const Header = styled.div`
	display: grid;
	grid-template-columns: 70px 1fr;
	background: ${({ theme }) => theme.background.primary};
	height: 70px;
`;

const AvatarWrapper = styled.div`
	display: grid;
	place-items: center;
	pointer-events: ${({ disabled }) => disabled && "none"};
`;

const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-right: 20px;

	h3,
	h4 {
		color: ${({ theme }) => theme.color.white};
		font-size: ${({ theme }) => theme.font.xs};
	}
	h4 {
		margin-top: 5px;
		font-size: ${({ theme }) => theme.font.xxs};
		opacity: 0.65;
	}
`;

const Body = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px 0;
	overflow: hidden;
`;
