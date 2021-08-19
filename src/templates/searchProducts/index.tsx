import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useSWR from "swr";
import SearchIcon from "@material-ui/icons/Search";
import { fetcher } from "src/utils/swrFetcher";
import ProductCard from "src/components/productCard";
import EmptyPageHeader from "src/components/emptyPageHeader";
import SearchInput from "src/components/input/searchInput";
import SpinnerLoading from "src/components/loadingIndicators/spinnerLoading";
import { motion } from "framer-motion";

interface pageProps {}

const mapState = (state) => ({
	searchTerm: state.search.term,
});

const SearchProductsTemplate = ({}: pageProps) => {
	const { searchTerm } = useSelector(mapState);
	const { data: products, error } = useSWR(
		searchTerm.length > 2 && `/api/products/search?term=${searchTerm}`,
		fetcher
	);

	return (
		<Container>
			<SearchInputWrapper>
				<SearchInput />
			</SearchInputWrapper>
			<Wrapper>
				<Heading>
					<h2>Search</h2>
					<span>
						{products && `${products.length} results for '${searchTerm}'`}
					</span>
				</Heading>
				{!searchTerm && (
					<EmptyPageHeader Icon={SearchIcon} title="Type for search" />
				)}
				{searchTerm && products?.length === 0 && (
					<p style={{ textAlign: "center" }}>No search results.</p>
				)}
				{!products ? (
					searchTerm && (
						<SpinnerLoading color="primary" style={{ margin: "0 auto" }} />
					)
				) : (
					<ProductsList layout>
						{products?.length !== 0 &&
							products.map((product) => (
								<ProductCard key={product.id} gridView="fill" data={product} />
							))}
					</ProductsList>
				)}
			</Wrapper>
		</Container>
	);
};

export default SearchProductsTemplate;

const Container = styled.div`
	background: ${({ theme }) => theme.surface.primary};
	min-height: 70vh;
	padding: 20px 15px;
`;

const SearchInputWrapper = styled.div`
	display: flex;
	@media (min-width: 768px) {
		display: none;
	}
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 1440px;
	width: 100%;
	margin: 0 auto;
`;

const Heading = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-bottom: 25px;
	color: ${({ theme }) => theme.color.white};
	overflow: hidden;

	> h2 {
		display: none;
		font-size: ${({ theme }) => `calc(${theme.font.xs} + 3vw)`};
	}

	> span {
		margin-top: 10px;
		opacity: 0.65;
		text-overflow: ellipsis;
	}

	@media (min-width: 768px) {
		margin-bottom: 3%;

		> h2 {
			display: inline-block;
		}
	}
`;

const ProductsList = styled(motion.div)`
	display: grid;
	grid-gap: 15px;
	grid-template-columns: repeat(2, 1fr);

	@media (min-width: 576px) {
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
	}
`;
