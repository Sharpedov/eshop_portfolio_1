import { ButtonBase } from "@material-ui/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import useSWR from "swr";
import { fetcher } from "src/utils/swrFetcher";
import ProductTemplate from "src/components/productCard";
import ProductSkeleton from "src/components/loadingSkeletons/productSkeleton";

interface pageProps {}

const ProductsNewArrivals = ({}: pageProps) => {
	const { data: productsFeed, error } = useSWR(
		`/api/products/newArrivals`,
		fetcher
	);
	const productRef = useRef(null);
	const [itemOffset, setItemOffset] = useState<number>(0);
	const [lastSlide, setLastSlide] = useState<number>(0);

	const handlePrevAndNext = useCallback(
		(type: string) => {
			if (productRef.current && productsFeed) {
				const itemsFeedLength = productsFeed.length - 2;
				const { offsetWidth } = productRef.current;

				if (type === "next")
					setItemOffset((prev) =>
						itemOffset === -(itemsFeedLength * (offsetWidth + 8))
							? lastSlide
							: prev - 2 * offsetWidth - 2 * 8
					);

				if (type === "prev")
					setItemOffset((prev) =>
						itemOffset >= 0 ? 0 : prev + 2 * offsetWidth + 2 * 8
					);

				return;
			}
		},
		[itemOffset, productRef, productsFeed, lastSlide]
	);

	useEffect(() => {
		if (productRef.current && productsFeed) {
			const itemsFeedLength = productsFeed.length - 2;
			const { offsetWidth } = productRef.current;

			setLastSlide(-(itemsFeedLength * (offsetWidth + 8)));
			itemOffset >= 0 && setItemOffset(0);
			itemOffset <= -(itemsFeedLength * (offsetWidth + 8)) &&
				setItemOffset(-(itemsFeedLength * (offsetWidth + 8)));
		}
	}, [itemOffset, productRef, productsFeed, lastSlide]);

	return (
		<Container>
			<Header>
				<HeaderTitle>
					<span>New Arrivals</span>
				</HeaderTitle>
				<HeaderControls>
					<HeaderControlButton
						aria-label="Previous products"
						disabled={itemOffset >= 0}
						onClick={() => handlePrevAndNext("prev")}
					>
						<NavigateBeforeRoundedIcon className="headerControl__icon" />
					</HeaderControlButton>
					<HeaderControlButton
						aria-label="Next products"
						disabled={itemOffset === lastSlide}
						onClick={() => handlePrevAndNext("next")}
					>
						<NavigateNextRoundedIcon className="headerControl__icon" />
					</HeaderControlButton>
				</HeaderControls>
			</Header>
			<Slider
				style={{
					transform: `translate3d(${itemOffset}px, 0px, 0px)`,
				}}
			>
				{!productsFeed
					? [1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
							<div ref={productRef} key={i}>
								<ProductSkeleton />
							</div>
					  ))
					: productsFeed.map((product, i) => (
							<div ref={productRef} key={i}>
								<ProductTemplate data={product} />
							</div>
					  ))}
			</Slider>
		</Container>
	);
};

export default ProductsNewArrivals;

const Container = styled.div`
	padding: 0 16px;
	max-width: 1720px;
	margin: 0 auto;
	width: 100%;
	overflow: hidden;
`;

const Header = styled.div`
	padding: 15px 0px;
	display: flex;
	gap: 15px;
	flex-direction: column;
	justify-content: space-between;

	@media (min-width: 480px) {
		align-items: center;
		padding: 15px 16px;
		flex-direction: row;
	}
`;

const HeaderTitle = styled.div`
	flex-grow: 1;
	> span {
		color: ${({ theme }) => theme.color.white};
		font-size: ${({ theme }) => theme.font.s};
	}
`;

const HeaderControls = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;

	gap: 10px;

	@media (min-width: 480px) {
		grid-template-columns: repeat(2, 85px);
	}
`;

const HeaderControlButton = styled(ButtonBase)`
	padding: 2px 6px;
	border: 2px solid rgba(58, 60, 63, 0.7);
	background-color: ${({ theme }) => theme.surface.primary};
	transition: all 0.2s cubic-bezier(0.5, 1, 0.89, 1);

	.headerControl__icon {
		font-size: ${({ theme }) => `calc(${theme.font.s} + 8px)`};
		color: ${({ theme }) => theme.gray};
		transition: all 0.2s cubic-bezier(0.5, 1, 0.89, 1);
	}

	&:hover {
		.headerControl__icon {
			color: ${({ theme }) => theme.color.white};
		}
	}

	&:disabled {
		opacity: 0.25;
		/* background-color: ${({ theme }) => theme.primary}; */
	}
`;

const Slider = styled.div`
	display: flex;
	gap: 8px;
	transition: all 0.3s cubic-bezier(0.5, 1, 0.89, 1);
	> div {
		min-width: 50%;
	}

	@media (min-width: 768px) {
		> div {
			min-width: 33.3333%;
		}
	}
	@media (min-width: 1180px) {
		> div {
			min-width: 25%;
		}
	}
	@media (min-width: 1440px) {
		> div {
			min-width: 20%;
		}
	}
`;
