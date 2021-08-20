import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import AppsIcon from "@material-ui/icons/Apps";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import SortIcon from "@material-ui/icons/Sort";
import FilterListIcon from "@material-ui/icons/FilterList";
import { useRouter } from "next/router";
import ProductCard from "src/components/productCard";
import CustomIconButton from "src/components/customIconButton";
import ProductSkeleton from "src/components/loadingSkeletons/productSkeleton";
import SelectMenu from "src/components/selectMenu";
import CustomButton from "src/components/customButton";
import Filters from "./filters";
import BannerProducts from "./bannerProducts";
import SpinnerLoading from "src/components/loadingIndicators/spinnerLoading";
import { useInfiniteQuery } from "src/hooks/useInfiniteQuery";

interface pageProps {
	gender: string;
}

const gridViewStorage = () => {
	if (typeof window !== "undefined") {
		if (localStorage.getItem("productGridView")) {
			return JSON.parse(localStorage.getItem("productGridView"));
		} else {
			return "fill";
		}
	}
};

const sortByOptions = [
	{ value: "Popularity", sort: "" },
	{ value: "Lowest Price", sort: "+price" },
	{ value: "Highest Price", sort: "-price" },
	{ value: "Alphabet A-Z", sort: "+title" },
	{ value: "Alphabet Z-A", sort: "-title" },
];

const ProductsTemplate = ({ gender }: pageProps) => {
	const [sortBy, setSortBy] = useState(sortByOptions[0]);
	const [gridView, setGridView] = useState("fill");
	const { query } = useRouter();
	const observer = useRef(null);
	const [isSortByOpen, setIsSortByOpen] = useState<boolean>(false);
	const [isOpenFiltersSidebar, setIsOpenFiltersSidebar] = useState(false);
	const {
		fetchNextPage,
		fetchedData,
		isLoadingInitialData,
		isLoadingMore,
		isEmpty,
		hasNextPage,
		error,
	} = useInfiniteQuery({
		queryKey: `/api/products?gender=${gender}&sort=${
			sortBy.sort
		}&limit=${9}&brand=${query.brand ? query.brand.toString().split("+") : []}
&category=${
			query.category ? query.category.toString().split("+") : []
		}&minPrice=${query.minPrice ? query.minPrice : 0}&maxPrice=${
			query.maxPrice ? query.maxPrice : 9999
		}`,
	});

	const sortByHandler = useCallback((value) => {
		setSortBy(value);
	}, []);

	const lastItemRef = useCallback(
		(node) => {
			if (isLoadingMore || hasNextPage) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && !hasNextPage) {
					fetchNextPage();
				}
			});
			if (node) observer.current.observe(node);
		},
		[isLoadingMore, hasNextPage, fetchNextPage]
	);

	const changeGridViewHandler = useCallback((typeView: "fit" | "fill") => {
		if (typeof window !== "undefined") {
			setGridView(typeView);
			localStorage.setItem("productGridView", JSON.stringify(typeView));
		}
	}, []);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setGridView(gridViewStorage());
		}
	}, []);

	return (
		<Container>
			<BannerProducts gender={gender} />
			<Wrapper>
				<GridContainer>
					<Filters
						isOpenFiltersSidebar={isOpenFiltersSidebar}
						onCloseFiltersSidebar={() => setIsOpenFiltersSidebar(false)}
					/>
					<Body>
						<FiltersBar>
							<ViewGrid>
								<CustomIconButton
									onClick={() => changeGridViewHandler("fill")}
									size="medium"
									Icon={AppsIcon}
									active={gridView === "fill"}
									ariaLabel="Fill products view"
								/>
								<CustomIconButton
									onClick={() => changeGridViewHandler("fit")}
									size="medium"
									Icon={ViewColumnIcon}
									active={gridView === "fit"}
									ariaLabel="Fit products view"
								/>
							</ViewGrid>
							<SortBy>
								<CustomButton
									variant="toolkit"
									onClick={() => setIsSortByOpen((prev) => !prev)}
									Icon={SortIcon}
									size="medium"
								>
									Sort by
								</CustomButton>
								<SelectMenu
									isOpen={isSortByOpen}
									onClose={() => setIsSortByOpen(false)}
									activeOption={sortBy}
									setValue={sortByHandler}
									options={sortByOptions}
								/>
							</SortBy>
							<FilterBy>
								<CustomButton
									onClick={() => setIsOpenFiltersSidebar((prev) => !prev)}
									variant="toolkit"
									Icon={FilterListIcon}
									size="medium"
								>
									Filter by
								</CustomButton>
							</FilterBy>
						</FiltersBar>
						<SortByText>
							Sorted by <span>{sortBy.value}</span>
						</SortByText>

						<ProductsList gridView={gridView}>
							{isLoadingInitialData ? (
								[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, i) => (
									<ProductSkeleton gridView={gridView} key={i} />
								))
							) : error ? (
								<div>{error}</div>
							) : (
								fetchedData.map((product, i) =>
									fetchedData.length === i + 1 ? (
										<div key={product._id} ref={lastItemRef}>
											<ProductCard data={product} gridView={gridView} />
										</div>
									) : (
										<ProductCard
											key={product._id}
											data={product}
											gridView={gridView}
										/>
									)
								)
							)}
						</ProductsList>
						{isLoadingMore && (
							<Row>
								<SpinnerLoading color="primary" />
							</Row>
						)}
						{hasNextPage && <Row>No more results</Row>}
					</Body>
				</GridContainer>
			</Wrapper>
		</Container>
	);
};

export default ProductsTemplate;

const appear = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${({ theme }) => theme.surface.primary};
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${({ theme }) => theme.surface.primary};
	z-index: 2;
	padding: 0 15px 20px;
	@media (min-width: 1024px) {
		padding: 20px 15px;
	}
`;

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 25px;
	align-items: flex-start;
	max-width: 1720px;
	width: 100%;
	margin: 0 auto;
	min-height: 70vh;
	@media (min-width: 1024px) {
		grid-template-columns: 275px 1fr;
	}
	@media (min-width: 1300px) {
		grid-template-columns: 300px 1fr;
	}
`;

const Body = styled.div`
	display: flex;
	flex-direction: column;
`;

const FiltersBar = styled.div`
	display: flex;
	animation: ${appear} 0.3s ease;
	@media (min-width: 1024px) {
		border-top: 1px solid ${({ theme }) => theme.surface.secondary};
		border-bottom: 1px solid ${({ theme }) => theme.surface.secondary};
	}
`;

const ViewGrid = styled.div`
	display: flex;
	align-items: center;
	gap: 0 5px;
	padding: 5px;
	@media (min-width: 1024px) {
		padding: 5px 10px;
		border-right: 1px solid ${({ theme }) => theme.surface.secondary};
	}
`;

const SortBy = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	gap: 0 5px;
	font-size: 14px;
	@media (min-width: 1024px) {
		border-right: none;
	}
`;

const FilterBy = styled.div`
	display: flex;
	align-items: center;
	gap: 0 5px;
	@media (min-width: 1024px) {
		display: none;
	}
`;

const SortByText = styled.div`
	margin: 5px 0 10px;
	font-size: 14px;
	color: ${({ theme }) => theme.color.white};
	opacity: 0.65;
	> span {
	}
`;

const ProductsList = styled.div`
	display: grid;
	grid-template-columns: ${({ gridView }) =>
		gridView === "fill"
			? "repeat(2, 1fr)"
			: gridView === "fit" && "repeat(auto-fit, minmax(260px, 1fr))"};
	grid-gap: 15px 10px;
	@media (min-width: 480px) {
		grid-template-columns: ${({ gridView }) =>
			gridView === "fill"
				? "repeat(auto-fill, minmax(200px, 1fr))"
				: gridView === "fit" && "repeat(auto-fit, minmax(260px, 1fr))"};
	}
	@media (min-width: 768px) {
		grid-template-columns: ${({ gridView }) =>
			gridView === "fill"
				? "repeat(auto-fill, minmax(250px, 1fr))"
				: gridView === "fit" && "repeat(auto-fit, minmax(280px, 1fr))"};
		grid-gap: 15px;
	}
	@media (min-width: 1024px) {
		grid-gap: 20px 15px;
	}
`;

const Row = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-grow: 1;
	padding: 15px 10px;
`;
