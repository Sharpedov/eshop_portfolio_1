import React, { useCallback, useRef } from "react";
import styled from "styled-components";
import CustomButton from "../customButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CustomIconButton from "../customIconButton";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import UserAvatar from "../userTools/userAvatar";
import { useDetectOutsideClick } from "src/hooks/useDetectOutsideClick";
import UserDropdownNavMenu from "../userTools/userDropdownNavMenu";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import CustomSkeleton from "../loadingSkeletons/customSkeleton";
import { useAuth } from "../authProvider";
import { toggleCart } from "src/store/slices/cartSlice";

interface pageProps {}

const mapState = (state) => ({
	cartLength: state.cart.items.reduce((acc, item) => acc + item.qty, 0),
	favouriteLength: state.favourite.items.length,
	cartIsOpen: state.cart.isOpen,
});

const RightSideNavbar = ({}: pageProps) => {
	const { user, loading, isLogged } = useAuth();
	const { cartLength, favouriteLength, cartIsOpen } = useSelector(mapState);
	const userDropdownRef = useRef<HTMLDivElement>(null);
	const [isUserDropdownActive, setIsUserDropdownActive] = useDetectOutsideClick(
		userDropdownRef,
		false
	);
	const { pathname } = useRouter();
	const dispatch = useDispatch();

	const toggleCartSidebarHandler = useCallback(() => {
		dispatch(toggleCart(cartIsOpen ? false : true));
	}, [dispatch, cartIsOpen]);

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
									<CartAndFavBadge>
										<span
											className={`${favouriteLength >= 99 && "favBadgeSmall"}`}
										>
											{favouriteLength}
										</span>
									</CartAndFavBadge>
								)}
							</div>
							<div style={{ position: "relative" }}>
								<CustomIconButton
									onClick={toggleCartSidebarHandler}
									ariaLabel="Cart"
									size="medium"
									Icon={LocalMallIcon}
									active={cartIsOpen}
								/>
								{cartLength >= 1 && (
									<CartAndFavBadge>
										<span className={`${cartLength >= 99 && "cartBadgeSmall"}`}>
											{cartLength >= 99 ? "99+" : cartLength}
										</span>
									</CartAndFavBadge>
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

	@media ${({ theme }) => theme.breakpoints.sm} {
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
	height: 20px;
	width: 20px;
	font-weight: 400;
	box-shadow: ${({ theme }) => theme.boxShadow.primary};
	pointer-events: none;

	> span {
		font-size: 1.4rem;
	}
	.favBadgeSmall,
	.cartBadgeSmall {
		font-size: 1rem;
	}

	@media ${({ theme }) => theme.breakpoints.sm} {
		display: grid;
	}
`;
