import { ButtonBase } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import CustomButton from "src/components/customButton";
import Sidebar from "src/components/sidebar";
import styled, { keyframes } from "styled-components";
import { filtersData } from "./filterData";

interface pageProps {
	isOpenFiltersSidebar: boolean;
	onCloseFiltersSidebar: () => void;
}

const Filters = ({
	isOpenFiltersSidebar,
	onCloseFiltersSidebar,
}: pageProps) => {
	const { pathname, query, push } = useRouter();
	const [brands, setBrands] = useState([]);
	const [categories, setCategories] = useState([]);
	const [minMaxPrice, setMinMaxPrice] = useState({
		min: 0,
		max: 9999,
	});

	useEffect(() => {
		query.brand && setBrands(query.brand.toString().split("+"));
		query.category && setCategories(query.category.toString().split("+"));
		query.minPrice &&
			query.maxPrice &&
			setMinMaxPrice({
				min: Number(query.minPrice),
				max: Number(query.maxPrice),
			});
	}, [pathname, query.brand, query.category, query.minPrice, query.maxPrice]);

	const applyFiltersHandler = useCallback(() => {
		push(
			{
				pathname,
				query: {
					...query,
					brand: brands.join("+"),
					category: categories.join("+"),
					minPrice: minMaxPrice.min,
					maxPrice: minMaxPrice.max,
				},
			},
			undefined,
			{ scroll: false }
		);
		onCloseFiltersSidebar();
	}, [
		brands,
		categories,
		minMaxPrice,
		onCloseFiltersSidebar,
		pathname,
		query,
		push,
	]);

	const resetFiltersHandler = useCallback(() => {
		setBrands([]);
		setCategories([]);
		setMinMaxPrice({
			min: 0,
			max: 9999,
		});
		push(pathname, undefined, { scroll: false });
	}, [push, pathname]);

	const handleMinMaxPrice = (action: "min" | "max", e) => {
		action === "min" &&
			setMinMaxPrice({
				...minMaxPrice,
				min: Number(e.target.value.replace(/\D/g, "")),
			});
		action === "max" &&
			setMinMaxPrice({
				...minMaxPrice,
				max: Number(e.target.value.replace(/\D/g, "")),
			});
	};

	return (
		<>
			<Container>
				<span>Filters</span>
				<Divider />

				<FiltersRow>
					<span>Brands</span>
					<FiltersList>
						{filtersData.brands.map((brand) => (
							<Filter
								active={brands.find((value) => value === brand)}
								key={brand}
								component="li"
								onClick={() =>
									brands.find((value) => value === brand)
										? setBrands((prev) =>
												prev.filter((value) => value !== brand)
										  )
										: setBrands((prev) => [...prev, brand])
								}
							>
								{brand}
							</Filter>
						))}
					</FiltersList>
				</FiltersRow>
				<Divider />
				<FiltersRow>
					<span>Categories</span>
					<FiltersList>
						{filtersData.categories.map((category) => (
							<Filter
								active={categories.find((value) => value === category)}
								key={category}
								component="li"
								onClick={() =>
									categories.find((value) => value === category)
										? setCategories((prev) =>
												prev.filter((value) => value !== category)
										  )
										: setCategories((prev) => [...prev, category])
								}
							>
								{category}
							</Filter>
						))}
					</FiltersList>
				</FiltersRow>
				<Divider />

				<FiltersRow>
					<span>Price</span>
					<PriceRow>
						<div>
							<InputPrice>
								<input
									type="text"
									value={minMaxPrice.min}
									onChange={(e) => handleMinMaxPrice("min", e)}
									maxLength={4}
								/>
								<span>$</span>
							</InputPrice>
						</div>
						<div>
							<InputPrice>
								<input
									type="text"
									value={minMaxPrice.max}
									onChange={(e) => handleMinMaxPrice("max", e)}
									maxLength={4}
								/>
								<span>$</span>
							</InputPrice>
						</div>
					</PriceRow>
				</FiltersRow>
				<Divider />

				<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
					<CustomButton size="small" onClick={resetFiltersHandler}>
						Reset filters
					</CustomButton>
					<CustomButton
						variant="contained"
						size="small"
						onClick={applyFiltersHandler}
					>
						Apply filters
					</CustomButton>
				</div>
			</Container>
			{/* //// Mobile Version //// */}
			<Sidebar
				isOpen={isOpenFiltersSidebar}
				onClose={() => {
					onCloseFiltersSidebar();
					applyFiltersHandler();
				}}
				headerText="Filters"
				displayNone={1024}
				slideFrom="Right"
			>
				<MobileWrapperTop>
					<FiltersRow>
						<span>Brands</span>
						<FiltersList>
							{filtersData.brands.map((brand) => (
								<Filter
									active={brands.find((value) => value === brand)}
									key={brand}
									component="li"
									onClick={() =>
										brands.find((value) => value === brand)
											? setBrands((prev) =>
													prev.filter((value) => value !== brand)
											  )
											: setBrands((prev) => [...prev, brand])
									}
								>
									{brand}
								</Filter>
							))}
						</FiltersList>
					</FiltersRow>
					<Divider />
					<FiltersRow>
						<span>Categories</span>
						<FiltersList>
							{filtersData.categories.map((category) => (
								<Filter
									active={categories.find((value) => value === category)}
									key={category}
									component="li"
									onClick={() =>
										categories.find((value) => value === category)
											? setCategories((prev) =>
													prev.filter((value) => value !== category)
											  )
											: setCategories((prev) => [...prev, category])
									}
								>
									{category}
								</Filter>
							))}
						</FiltersList>
					</FiltersRow>
					<Divider />
					<FiltersRow>
						<span>Price</span>
						<PriceRow>
							<div>
								<InputPrice>
									<input
										type="text"
										value={minMaxPrice.min}
										onChange={(e) => handleMinMaxPrice("min", e)}
										maxLength={4}
									/>
									<span>$</span>
								</InputPrice>
							</div>
							<div>
								<InputPrice>
									<input
										type="text"
										value={minMaxPrice.max}
										onChange={(e) => handleMinMaxPrice("max", e)}
										maxLength={4}
									/>
									<span>$</span>
								</InputPrice>
							</div>
						</PriceRow>
					</FiltersRow>
					<Divider />
				</MobileWrapperTop>
				<MobileWrapperBottom>
					<CustomButton size="small" onClick={resetFiltersHandler}>
						Reset filters
					</CustomButton>
					<CustomButton
						variant="contained"
						size="small"
						onClick={applyFiltersHandler}
					>
						View products
					</CustomButton>
				</MobileWrapperBottom>
			</Sidebar>
		</>
	);
};

export default Filters;

const appearFilters = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const Container = styled.div`
	display: none;
	padding: 20px 10px;
	background: ${({ theme }) => theme.surface.secondary};
	border-radius: 4px;
	animation: ${appearFilters} 0.3s linear;

	> span {
		font-size: 21px;
	}

	@media (min-width: 1024px) {
		display: flex;
		flex-direction: column;
		gap: 15px;
		position: sticky;
		top: 78px;
	}
`;

const MobileWrapperTop = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px 15px;
	gap: 15px;
`;
const MobileWrapperBottom = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px 15px;
	gap: 5px;
	margin-top: auto;
`;

const FiltersList = styled.ul`
	display: flex;
	flex-wrap: wrap;
	gap: 5px;
`;

const PriceRow = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 10px;
	color: ${({ theme }) => theme.color.white};
	padding: 0 10px;

	> div > span {
		font-size: 12px;
		margin-left: 1px;
		opacity: 0.65;
	}
`;

const InputPrice = styled.div`
	display: flex;
	align-items: center;
	position: relative;

	> span {
		display: flex;
		align-items: center;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		transform: translateX(-100%);
		font-size: 15px;
		opacity: 0.65;
		transition: all 0.15s ease-in-out;
	}

	> input {
		width: 100%;
		padding: 5px 10px;
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 15px;
		color: ${({ theme }) => theme.color.white};
		transition: all 0.15s ease-in-out;

		&[type="number"]::-webkit-inner-spin-button,
		&[type="number"]::-webkit-outer-spin-button {
			-webkit-appearance: none;
		}

		&:focus {
			border-color: ${({ theme }) => theme.color.primary};
		}
	}

	&:hover {
		> input {
			border-color: ${({ theme }) => theme.color.primary};
		}

		> span {
			opacity: 1;
		}
	}
`;

const Filter = styled(ButtonBase)`
	color: ${({ theme, active }) =>
		active ? theme.color.primary : theme.color.white};
	opacity: ${({ theme, active }) => (active ? "1" : "0.65")};
	padding: 1px 5px;
	border-radius: 2px;
	font-size: 16px;
	transition: all 0.1s ease-in-out;

	&:hover {
		opacity: 0.9;
		background: rgba(255, 255, 255, 0.1);
	}
`;

const FiltersRow = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	color: ${({ theme }) => theme.color.white};

	> span {
		font-size: 16px;
	}
`;

const Divider = styled.div`
	display: flex;
	flex-grow: 1;
	background-color: rgba(80, 80, 80, 0.3);
	height: 1px;
	margin: 3px 0;
`;
