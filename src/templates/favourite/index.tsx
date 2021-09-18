import React, { useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { ButtonBase } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteIcon from "@material-ui/icons/Delete";
import EmptyPageHeader from "src/components/emptyPageHeader";
import ProductCard from "src/components/productCard";
import { clearFavouriteList } from "src/store/slices/favouriteSlice";
import SpinnerLoading from "src/components/loadingIndicators/spinnerLoading";
import { useAuth } from "src/components/authProvider";
import { AnimateSharedLayout, motion } from "framer-motion";

interface pageProps {}

const mapState = (state) => ({
	favList: state.favourite.items,
	loadingFavouriteClear: state.favourite.clear.loading,
});

const FavouriteTemplate = ({}: pageProps) => {
	const { loading } = useAuth();
	const { favList, loadingFavouriteClear } = useSelector(mapState);
	const dispatch = useDispatch();

	const clearFavouriteListHandler = useCallback(() => {
		dispatch(clearFavouriteList({}));
	}, [dispatch]);

	return (
		<Container>
			<Wrapper>
				<Heading>
					<h2>Favourite list</h2>
				</Heading>
				{loading ? (
					<SpinnerLoading style={{ margin: "50px auto 0" }} color="primary" />
				) : (
					<>
						{favList.length >= 1 && (
							<Toolbar>
								<ClearFavList
									onClick={clearFavouriteListHandler}
									loading={loadingFavouriteClear}
								>
									<DeleteIcon className="favouriteToolbar__icon" />
									<span>Clear fav list</span>
								</ClearFavList>
							</Toolbar>
						)}
						{favList.length === 0 ? (
							<EmptyFavouriteContainer>
								<EmptyPageHeader
									Icon={FavoriteBorderIcon}
									title="Your favourite list is empty"
								/>
							</EmptyFavouriteContainer>
						) : (
							<AnimateSharedLayout>
								<FavouriteProductsList
									animate={{
										scale: loadingFavouriteClear ? 0.97 : 1,
										opacity: loadingFavouriteClear ? 0.6 : 1,
									}}
									layout
								>
									{favList.map((product) => (
										<ProductCard key={product._id} data={product} />
									))}
								</FavouriteProductsList>
							</AnimateSharedLayout>
						)}
					</>
				)}
			</Wrapper>
		</Container>
	);
};

export default FavouriteTemplate;

const appear = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const Container = styled.div`
	position: relative;
	background: ${({ theme }) => theme.background.primary};
	min-height: 70vh;
	padding: 20px 15px;

	@media ${({ theme }) => theme.breakpoints.sm} {
		padding: 20px 20px;
	}
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 1400px;
	width: 100%;
	margin: 0 auto;

	> img {
		position: absolute;
		bottom: 0;
		right: 0;
		display: block;
		width: 90%;
		height: 300px;
		object-fit: contain;
	}

	@media ${({ theme }) => theme.breakpoints.lg} {
		> img {
			width: 40%;
		}
	}
`;

const Heading = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	> h2 {
		font-size: ${({ theme }) => `calc(${theme.font.xs} + 3vw)`};
	}
`;

const Toolbar = styled.ul`
	display: flex;
	align-items: center;
	margin: 15px 0;
	animation: ${appear} 0.25s ease-in-out;

	@media ${({ theme }) => theme.breakpoints.lg} {
		margin: 1.5% 0;
	}
`;

const ClearFavList = styled(ButtonBase)`
	display: flex;
	gap: 0 7px;
	padding: 10px 15px;
	align-items: center;
	opacity: ${({ loading }) => (loading ? "0.6" : "1")};
	transform: ${({ loading }) => (loading ? "scale(0.95)" : "none")};
	transition: transform 0.2s cubic-bezier(0.37, 0, 0.63, 1);

	.favouriteToolbar__icon {
		font-size: ${({ theme }) => `calc(${theme.font.xs} + 2px)`};
	}

	span {
		color: ${({ theme }) => theme.color.white};
		font-size: ${({ theme }) => theme.font.xs};
	}
`;

const FavouriteProductsList = styled(motion.ul)`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 10px;
	animation: ${appear} 0.25s ease-in-out;

	@media ${({ theme }) => theme.breakpoints.sm} {
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	}
`;

const EmptyFavouriteContainer = styled.div`
	display: grid;
	place-items: center;
	margin-top: 29px;
	animation: ${appear} 0.25s ease-in-out;
`;
