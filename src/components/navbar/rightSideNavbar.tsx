import React, { useRef } from "react";
import styled from "styled-components";
import CustomButton from "../customButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CustomIconButton from "../customIconButton";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import UserAvatar from "../userTools/userAvatar";
import { useDetectOutsideClick } from "src/utils/useDetectOutsideClick";
import UserDropdownNavMenu from "../userTools/userDropdownNavMenu";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import CustomSkeleton from "../loadingSkeletons/customSkeleton";
import { useAuth } from "../authProvider";

interface pageProps {
	toggleCartSidebar: () => void;
	cartSidebarIsOpen: boolean;
}

const mapState = (state) => ({
	cartLength: state.cart.items.length,
	favouriteLength: state.favourite.items.length,
});

const RightSideNavbar = ({
	toggleCartSidebar,
	cartSidebarIsOpen,
}: pageProps) => {
	const { user, loading, isLogged } = useAuth();
	const { cartLength, favouriteLength } = useSelector(mapState);
	const userDropdownRef = useRef<HTMLDivElement>(null);
	const [isUserDropdownActive, setIsUserDropdownActive] = useDetectOutsideClick(
		userDropdownRef,
		false
	);
	const { pathname } = useRouter();

	return (
		<>
			<RightSide>
				<IconsList>
					{loading ? (
						<>
							<CustomSkeleton variant="circle" height={30} width={30} />
							<CustomSkeleton variant="circle" height={30} width={30} />
						</>
					) : (
						<>
							<div style={{ position: "relative" }}>
								<CustomIconButton
									ariaLabel="Favourite Page"
									size="medium"
									Icon={FavoriteIcon}
									href="/favourite"
									active={pathname === "/favourite"}
								/>
								{favouriteLength >= 1 && (
									<CartAndFavBadge>{favouriteLength}</CartAndFavBadge>
								)}
							</div>
							<div style={{ position: "relative" }}>
								<CustomIconButton
									onClick={toggleCartSidebar}
									ariaLabel="Cart"
									size="medium"
									Icon={LocalMallIcon}
									active={cartSidebarIsOpen}
								/>
								{cartLength >= 1 && (
									<CartAndFavBadge>{cartLength}</CartAndFavBadge>
								)}
							</div>
						</>
					)}
				</IconsList>
				{loading ? (
					<UserAvatar width={42} src={null} loading={loading} />
				) : isLogged ? (
					<div style={{ position: "relative" }}>
						<UserAvatar
							width={42}
							src={user.avatar ?? null}
							onClick={() => setIsUserDropdownActive((prev) => !prev)}
						/>
						<div ref={userDropdownRef}>
							<UserDropdownNavMenu
								user={user}
								isOpen={isUserDropdownActive}
								onClose={() => setIsUserDropdownActive(false)}
							/>
						</div>
					</div>
				) : (
					<CustomButton href="/sign-in" size="medium">
						Sign in
					</CustomButton>
				)}
			</RightSide>
		</>
	);
};

export default RightSideNavbar;

const RightSide = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 0 15px;

	@media (min-width: 480px) {
		flex: 0.35;
	}
`;

const IconsList = styled.div`
	display: none;
	align-items: center;
	gap: 0 15px;

	@media (min-width: 768px) {
		display: flex;
	}
`;

const CartAndFavBadge = styled.div`
	position: absolute;
	display: none;
	place-items: center;
	top: 0;
	right: 0;
	transform: translate(3px, -3px);
	background: ${({ theme }) => theme.color.primary};
	border-radius: 50%;
	height: 17px;
	width: 17px;
	/* text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8); */
	font-size: 14px;
	font-weight: 400;
	box-shadow: ${({ theme }) => theme.boxShadow.primary};

	@media (min-width: 576px) {
		display: grid;
	}
`;
