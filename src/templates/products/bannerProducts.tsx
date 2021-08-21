import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";

interface pageProps {
	gender: string;
}

const bannerProductsData = [
	{
		gender: "men",
		data: {
			image:
				"https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
			title: "Men's fashion",
		},
	},

	{
		gender: "women",
		data: {
			image:
				"https://cdn.shopify.com/s/files/1/0506/3055/7887/files/Fashion_cosmetics_and_accessories_1800x1200_7e30ba3a-0364-4f14-9bb6-1f5c3dedf8bb_1920x.png?v=1614372148",
			title: "Women's fashion",
		},
	},
];

const BannerProducts = ({ gender }: pageProps) => {
	const [offsetY, setOffsetY] = useState(0);

	const scrollHandler = useCallback(() => {
		setOffsetY(window.pageYOffset);
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", scrollHandler);

		return () => window.removeEventListener("scroll", scrollHandler);
	}, [scrollHandler]);

	const filteredBannerProductsData = useMemo(() => {
		switch (gender.toLowerCase()) {
			case "men": {
				return bannerProductsData.filter((data) => data.gender === "men")[0]
					.data;
			}
			case "women": {
				return bannerProductsData.filter((data) => data.gender === "women")[0]
					.data;
			}
			default:
				return;
		}
	}, [gender]);

	return (
		<BannerWrapper
			style={{
				opacity: `${1 - offsetY / 200}`,
				transform: `translateY(${offsetY * -0.4}px)`,
			}}
		>
			<Banner bgUrl={filteredBannerProductsData.image}>
				<BannerText>{filteredBannerProductsData.title}</BannerText>
			</Banner>
		</BannerWrapper>
	);
};

export default BannerProducts;

const appear = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const BannerWrapper = styled.div`
	position: sticky;
	top: 54px;
	left: 0;
	right: 0;
	z-index: 1;
	background: ${({ theme }) => theme.surface.primary};
	transition: opacity 0.2s ease;
	animation: ${appear} 0.3s ease;

	@media (min-width: 480px) {
		top: 58px;
	}
`;

const Banner = styled.div`
	display: grid;
	place-items: center;
	background-image: ${({ bgUrl }) => `url(${bgUrl})`};
	background-size: cover;
	background-position: 50% 35%;
	background-repeat: no-repeat;
	width: 100%;
	height: clamp(180px, 50vw, 280px);

	&:after {
		content: "";
		position: absolute;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.45);
	}
`;

const BannerText = styled.h5`
	position: relative;
	font-size: clamp(30px, 5vw, 46px);
	color: ${({ theme }) => theme.color.white};
	opacity: 0.9;
	font-weight: 500;
	z-index: 1;

	&::after {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		transform: translateY(10px);
		border-bottom: 4px solid ${({ theme }) => theme.color.primary};
		width: 25%;
	}
`;
