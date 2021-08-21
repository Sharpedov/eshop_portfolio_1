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
import { Skeleton } from "@material-ui/lab";
import { logout } from "src/store/slices/authSlice";

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
		<Container isopen={isOpen}>
			<Header>
				<AvatarWrapper>
					<UserAvatar src={user.avatar} width={48} />
				</AvatarWrapper>
				<UserInfo>
					<h3>{user.username}</h3>
					<h4>{user.email}</h4>
				</UserInfo>
			</Header>
			<Body isOpen={isOpen}>
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
	);
};

export default UserDropdownNavMenu;

const StyledSkeleton = styled(Skeleton)``;

const Container = styled.nav`
	position: absolute;
	top: calc(100% - 3px);
	display: flex;
	flex-direction: column;
	right: 0;
	background: ${({ theme }) => theme.background.secondary};
	width: 255px;
	box-shadow: 0px 4px 15px 5px rgba(0, 0, 0, 0.2);
	opacity: ${({ isopen }) => (isopen ? "1" : "0")};
	transform: ${({ isopen }) => (isopen ? "translateY(0)" : "translateY(-7px)")};
	visibility: ${({ isopen }) => (isopen ? "visible" : "hidden")};
	transition: opacity 0.25s cubic-bezier(0.37, 0, 0.63, 1),
		transform 0.2s cubic-bezier(0.37, 0, 0.63, 1), visibility 0.2s ease-in-out;
	overflow: hidden;
	z-index: 103;
	border-radius: 2px;
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
	transform: ${({ isOpen }) => (isOpen ? "none" : "translateY(-2px)")};
	pointer-events: ${({ disabled }) => disabled && "none"};
	transition: all 0.15s cubic-bezier(0.37, 0, 0.63, 1);
	transition-delay: 0.05s;
`;
