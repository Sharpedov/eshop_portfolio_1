import { ButtonBase } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import { useEffect } from "react";
import Image from "next/image";

interface pageProps {
	productDetails;
}

const ProductGallery = ({ productDetails }: pageProps) => {
	const [selectedImage, setSelectedImage] = useState<number>(0);
	const imagesLength = productDetails?.images.length;
	const [offsetY, setOffsetY] = useState<number>(0);
	const [changeOpacityOfContainer, setChangeOpacityOfContainer] =
		useState<boolean>(
			typeof window !== "undefined" && window.innerWidth >= 768 ? false : true
		);

	const handleScroll = useCallback(() => setOffsetY(window.pageYOffset), []);
	const disableScrolling = useCallback(() => {
		if (typeof window !== "undefined") {
			return setChangeOpacityOfContainer(
				window.innerWidth >= 768 ? false : true
			);
		}
	}, []);

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("resize", disableScrolling);

			if (changeOpacityOfContainer) {
				window.addEventListener("scroll", handleScroll);
			}

			return () => {
				window.removeEventListener("scroll", handleScroll);
				window.removeEventListener("resize", disableScrolling);
			};
		}
	}, [changeOpacityOfContainer, disableScrolling, handleScroll]);

	const navigationArrowsHandler = useCallback(
		(typeAction: "prev" | "next") => {
			if (typeAction === "prev")
				setSelectedImage((prev) => (prev === 0 ? 0 : prev - 1));

			if (typeAction === "next")
				setSelectedImage((prev) =>
					prev === imagesLength - 1 ? imagesLength - 1 : prev + 1
				);

			return;
		},
		[imagesLength]
	);

	const navigationDotsHandler = useCallback((index: number) => {
		setSelectedImage(index);
	}, []);

	return (
		<Container opacity={`${35 / offsetY}`}>
			<Slider>
				{productDetails.images.map((img, i) => (
					<Slide
						key={img}
						style={{ transform: `translateX(${selectedImage * -100}%)` }}
					>
						<Image
							src={img}
							layout="fill"
							objectFit="cover"
							alt={productDetails.title}
						/>
					</Slide>
				))}
				<ArrowsNav>
					<ArrowNav
						component="li"
						onClick={() => navigationArrowsHandler("prev")}
						disabled={selectedImage === 0}
						aria-label="Previous product image button"
					>
						<NavigateBeforeRoundedIcon className="carousel__icon" />
					</ArrowNav>
					<ArrowNav
						component="li"
						onClick={() => navigationArrowsHandler("next")}
						disabled={selectedImage === imagesLength - 1}
						aria-label="Next product image button"
					>
						<NavigateNextRoundedIcon className="carousel__icon" />
					</ArrowNav>
				</ArrowsNav>

				<DotsNav>
					{productDetails.images.map((_, i) => (
						<DotNav
							key={`productGalleryDot-${i}`}
							onClick={() => navigationDotsHandler(i)}
							active={i === selectedImage ? 1 : 0}
						/>
					))}
				</DotsNav>
			</Slider>
			<Thumbnails>
				{productDetails.images.map((img, i) => (
					<Thumbnail
						component="li"
						key={`productGalleryThumnbail-${i}`}
						onClick={() => navigationDotsHandler(i)}
						active={i === selectedImage ? 1 : 0}
					>
						<Image
							src={img}
							layout="fill"
							objectFit="cover"
							alt={productDetails.title}
						/>
					</Thumbnail>
				))}
			</Thumbnails>
		</Container>
	);
};

export default ProductGallery;

const Container = styled.div`
	display: flex;
	width: 100%;
	position: sticky;
	top: 54px;
	left: 0;
	transition: all 0.15s linear;
	opacity: ${({ opacity }) => opacity};

	@media ${({ theme }) => theme.breakpoints.sm} {
		top: 58px;
	}

	@media ${({ theme }) => theme.breakpoints.md} {
		display: flex;
		position: sticky;
		width: 100%;
		padding: 20px 0 90px 15px;
		opacity: 1;
	}

	@media ${({ theme }) => theme.breakpoints.lg} {
		display: grid;
		gap: 10px;
		grid-template-columns: 1fr;
	}
`;

const Slider = styled.div`
	position: relative;
	display: flex;
	width: 100%;
	overflow: hidden;
	margin-bottom: auto;
	max-height: 475px;

	@keyframes productDetailsGalleryAppear {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@media (min-width: 400px) {
		max-height: 525px;
	}
	@media ${({ theme }) => theme.breakpoints.sm} {
		max-height: 600px;
	}
	@media ${({ theme }) => theme.breakpoints.md} {
		max-height: 625px;
	}
	@media ${({ theme }) => theme.breakpoints.lg} {
		max-height: 650px;
	}
`;

const Slide = styled.div`
	position: relative;
	display: flex;
	min-width: 100%;
	height: 100vw;
	transition: all 0.25s cubic-bezier(0.5, 1, 0.89, 1);
	animation: slideAnim 0.3s linear;
	background-color: #f2f2f2;
	max-height: 475px;

	@media (min-width: 400px) {
		max-height: 525px;
	}
	@media ${({ theme }) => theme.breakpoints.sm} {
		max-height: 600px;
	}
	@media ${({ theme }) => theme.breakpoints.md} {
		max-height: 625px;
	}
	@media ${({ theme }) => theme.breakpoints.lg} {
		max-height: 650px;
	}

	@keyframes slideAnim {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`;

const ArrowsNav = styled.ul`
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 10px;
	top: 50%;
	left: 0;
	right: 0;
	transform: translateY(-50%);
`;

const ArrowNav = styled(ButtonBase)`
	padding: 6px 3px;
	background: ${({ theme }) => theme.background.secondary};
	border-radius: 5px;
	z-index: 2;
	transition: all 0.2s cubic-bezier(0.5, 1, 0.89, 1);

	span {
		color: #fff;
	}
	&.Mui-disabled {
		opacity: 0.7;
	}

	:hover {
		background-color: ${({ theme }) => theme.background.secondary};
	}

	.carousel__icon {
		font-size: 3.4rem;
		color: #fff;
	}
`;

const DotsNav = styled.ul`
	position: absolute;
	bottom: 3%;
	left: 0;
	right: 0;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(8px, 10px));
	align-items: center;
	justify-content: center;
	gap: 20px;
	padding: 10px 16px;

	@media ${({ theme }) => theme.breakpoints.lg} {
		display: none;
	}
`;

const DotNav = styled.li`
	height: 16px;
	width: 16px;
	border-radius: 50%;
	border: ${({ theme, active }) =>
		active
			? `4px solid ${theme.color.primary}`
			: `3px solid ${theme.color.gray}`};
	background-color: transition;
	cursor: pointer;
	transition: all 0.1s cubic-bezier(0.5, 1, 0.89, 1);
	outline: none;

	:hover {
		filter: brightness(1.3);
	}
`;

const Thumbnails = styled.ul`
	display: none;
	grid-template-columns: repeat(auto-fill, 70px);
	align-items: center;
	justify-content: center;
	grid-auto-rows: 88px;
	gap: 10px;
	overflow-y: scroll;
	animation: productDetailsGalleryAppear 0.35s linear;

	@keyframes productDetailsGalleryAppear {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	::-webkit-scrollbar {
		display: none;
	}

	@media ${({ theme }) => theme.breakpoints.lg} {
		display: grid;
	}
`;

const Thumbnail = styled(ButtonBase)`
	position: relative;
	transition: all 0.2s cubic-bezier(0.5, 1, 0.89, 1);
	animation: ${({ appear }) => appear && `thumbnailAnim 0.3s linear`};
	height: 100%;

	&::after {
		content: "";
		position: absolute;
		inset: 0;
		border: ${({ theme }) => `0px solid ${theme.color.primary}`};
		border-width: ${({ active }) => active && "3px"};
		transition: all 0.05s cubic-bezier(0.5, 1, 0.89, 1);
	}

	> span {
		color: #000;
	}
	> img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@keyframes thumbnailAnim {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`;
