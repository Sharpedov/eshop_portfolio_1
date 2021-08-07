import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useRouter } from "next/router";
import Tabs from "src/components/tabs";
import AccountDefaultContent from "./accountDefault";
import AccountOrdersContent from "./accountOrders";
import { useEffect } from "react";
import AccountSettings from "./accountSettings";
import CustomSkeleton from "src/components/loadingSkeletons/customSkeleton";
import { useAuth } from "src/components/authProvider";
import { useSelector } from "react-redux";

interface pageProps {}

const TabsData = [
	{
		title: "Account",
		Icon: AccountBoxIcon,
	},
	{
		title: "Orders History",
		Icon: ListAltIcon,
	},
	{
		title: "Account Settings",
		Icon: ListAltIcon,
	},
];

const mapState = (state) => ({
	cartLength: state.cart.items.length,
	favouriteLength: state.favourite.items.length,
});

const AccountTemplate = ({}: pageProps) => {
	const { cartLength, favouriteLength } = useSelector(mapState);
	const { user, loading } = useAuth();
	const { query } = useRouter();
	const [currentTab, setCurrentTab] = useState<number>(0);

	useEffect(() => {
		setCurrentTab(Number(query.tab) || 0);
	}, [query]);

	return (
		<Container>
			<Banner></Banner>
			<Header>
				<HeaderWrapper>
					<UserAvatarWrap>
						{loading ? (
							<CustomSkeleton />
						) : (
							<UserAvatar alt="User avatar" src={user?.avatar} />
						)}
					</UserAvatarWrap>
					<UserNameAndEmail>
						{loading ? (
							<>
								<CustomSkeleton variant="text" width={140} />
								<CustomSkeleton variant="text" width={150} />
							</>
						) : (
							<>
								<h2>{user.username}</h2>
								<span>{user.email}</span>
							</>
						)}
					</UserNameAndEmail>
				</HeaderWrapper>
			</Header>
			<ContentBox>
				<SidePanel>
					<SidePanelTiles>
						<SidePanelTile>
							<div>Orders</div>
							<div>
								{loading ? (
									<CustomSkeleton variant="text" width={25} height={18} />
								) : (
									user.orders?.length
								)}
							</div>
						</SidePanelTile>
						<SidePanelTile>
							<div>Cart</div>
							<div>
								{loading ? (
									<CustomSkeleton variant="text" width={25} height={18} />
								) : (
									cartLength
								)}
							</div>
						</SidePanelTile>
						<SidePanelTile>
							<div>Favourite</div>
							<div>
								{loading ? (
									<CustomSkeleton variant="text" width={25} height={18} />
								) : (
									favouriteLength
								)}
							</div>
						</SidePanelTile>
						<SidePanelTile>
							<div>Returns</div>
							<div>
								{loading ? (
									<CustomSkeleton variant="text" width={25} height={18} />
								) : (
									0
								)}
							</div>
						</SidePanelTile>
					</SidePanelTiles>
				</SidePanel>

				<Content>
					<Tabs
						tabs={TabsData}
						currentTab={currentTab}
						setCurrentTab={setCurrentTab}
						fullWidth
						background="primary"
					/>

					<ContentSlider
						style={{
							transform: `translateX(calc(-${currentTab * 100}%))`,
						}}
					>
						<ContentSlide>
							{currentTab === 0 && <AccountDefaultContent />}
						</ContentSlide>
						<ContentSlide>
							{currentTab === 1 && <AccountOrdersContent />}
						</ContentSlide>
						<ContentSlide>
							{currentTab === 2 && <AccountSettings />}
						</ContentSlide>
					</ContentSlider>
				</Content>
			</ContentBox>
		</Container>
	);
};

export default AccountTemplate;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	background: ${({ theme }) => theme.surface.secondary};
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 1440px;
	width: 100%;
	margin: 0 auto;
`;

const Banner = styled.div`
	background: #181819;
	height: 50vw;
	max-height: 300px;
	width: 100%;
`;

const Header = styled.div`
	background: ${({ theme }) => theme.surface.primary};
`;

const HeaderWrapper = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	max-width: 1440px;
	width: 100%;
	margin: 0 auto;
	height: 50px;
	padding: 0 10px;
	transition: all 0.2s ease-in-out;

	@media (min-width: 576px) {
		height: 60px;
		padding: 0 15px;
	}

	@media (min-width: 768px) {
		height: 70px;
		padding: 0 20px;
	}
	@media (min-width: 1024px) {
		height: 75px;
		padding: 0 24px;
	}
`;

const UserAvatarWrap = styled.div`
	position: absolute;
	top: 0;
	transform: translateY(-50%);
	border-radius: 50%;
	overflow: hidden;
	transition: all 0.2s ease-in-out;
	background-color: ${({ theme }) => theme.surface.primary};
	height: 80px;
	width: 80px;

	@media (min-width: 480px) {
		height: 95px;
		width: 95px;
	}

	@media (min-width: 768px) {
		height: 105px;
		width: 105px;
	}

	@media (min-width: 1024px) {
		height: 120px;
		width: 120px;
	}
`;

const UserAvatar = styled(Avatar)`
	height: inherit;
	width: inherit;
	border: 4px solid ${({ theme }) => theme.surface.primary};
`;

const UserNameAndEmail = styled.div`
	display: flex;
	flex-direction: column;
	gap: 3px 0;
	padding: 0 15px 0 90px;
	color: ${({ theme }) => theme.color.white};

	> h2 {
		font-size: ${({ theme }) => theme.font.xs};
	}

	> span {
		font-size: ${({ theme }) => `calc(${theme.font.xxs} + 1px)`};
		opacity: 0.65;
	}

	@media (min-width: 480px) {
		padding: 0 15px 0 110px;

		> h2 {
			font-size: ${({ theme }) => `calc(${theme.font.xs} + 2px)`};
		}
	}

	@media (min-width: 768px) {
		padding: 0 15px 0 130px;
		gap: 6px 0;

		> h2 {
			font-size: ${({ theme }) => `calc(${theme.font.xs} + 4px)`};
		}
		> span {
			font-size: ${({ theme }) => `calc(${theme.font.xxs} + 2px)`};
			opacity: 0.65;
		}
	}

	@media (min-width: 1024px) {
		padding: 0 15px 0 140px;

		> h2 {
			font-size: ${({ theme }) => theme.font.s};
		}
	}
`;

const ContentBox = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	align-items: flex-start;
	grid-gap: 10px;
	transition: all 0.2 ease-in-out;
	max-width: 1440px;
	width: 100%;
	margin: 15px auto;

	@media (min-width: 768px) {
		grid-template-columns: 300px 1fr;
		padding: 0 16px;
	}
	@media (min-width: 1024px) {
		grid-template-columns: 350px 1fr;
	}
	@media (min-width: 1440px) {
		grid-template-columns: 375px 1fr;
		grid-gap: 25px;
		margin: 25px auto;
	}
`;

const SidePanel = styled.div`
	background: ${({ theme }) => theme.surface.primary};
	border-radius: 2px;
`;

const SidePanelTiles = styled.ul`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-auto-rows: 65px;
`;

const SidePanelTile = styled.li`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: ${({ theme }) => theme.color.white};
	font-weight: 400;
	font-size: 15px;

	&:nth-child(1),
	&:nth-child(3) {
		border-right: 1px solid ${({ theme }) => theme.surface.secondary};
		border-bottom: 1px solid ${({ theme }) => theme.surface.secondary};
	}

	&:nth-child(2),
	&:nth-child(4) {
		border-bottom: 1px solid ${({ theme }) => theme.surface.secondary};
	}

	div:nth-child(1) {
		margin-bottom: 3px;
	}
	div:nth-child(2) {
		opacity: 0.65;
	}
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	overflow: hidden;
	margin: 0 8px;

	@media (min-width: 768px) {
		margin: 0;
	}
`;

const ContentSlider = styled.div`
	display: flex;
	align-items: flex-start;
	transition: all 0.2s cubic-bezier(0.5, 1, 0.89, 1);
`;

const ContentSlide = styled.div`
	min-width: 100%;
`;
