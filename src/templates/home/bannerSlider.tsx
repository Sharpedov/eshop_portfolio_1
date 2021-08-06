import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import { ButtonBase } from "@material-ui/core";
import CustomButton from "src/components/customButton";

const bannerData = [
	{
		image:
			"https://images.pexels.com/photos/432059/pexels-photo-432059.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
		title: "Lorem Ipsum.",
		subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	},

	{
		image: "https://pixy.org/src2/570/5709999.jpg",
		title: "Lorem Ipsum. Lorem Ipsum.",
		subtitle:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	},
];

interface pageProps {}

const BannerSlider = ({}: pageProps) => {
	const [intervalID, setIntervalID] = useState(null);
	const [width, setWidth] = useState<number>(0);
	const [currentImg, setCurrentImg] = useState(0);
	const bannerDataLength = bannerData.length;

	const handleStartTimer = () => {
		const id = setInterval(() => {
			setWidth((prev) => {
				if (prev < 100) {
					return prev + 0.5;
				}

				clearInterval(id);
				return prev;
			});
		}, 20);

		setIntervalID(id);
	};

	const handleNextSlide = useCallback(() => {
		setCurrentImg((prev) =>
			bannerDataLength - 1 === currentImg ? 0 : prev + 1
		);
		setWidth(0);
	}, [currentImg, bannerDataLength]);

	const handlePrevSlide = useCallback(() => {
		setCurrentImg((prev) =>
			currentImg === 0 ? bannerDataLength - 1 : prev - 1
		);
		setWidth(0);
	}, [currentImg, bannerDataLength]);

	const handleDotClick = useCallback(
		(i) => {
			setCurrentImg(i);
			setWidth(0);
		},
		[currentImg]
	);

	useEffect(() => {
		if (width === 100) {
			handleNextSlide();
		}
	}, [width]);

	useEffect(() => {
		handleStartTimer();
	}, []);

	return (
		<Container>
			<BannerWrapper>
				{bannerData.map((el, i) => {
					return (
						<BannerImage key={i} active={i === currentImg ? true : false}>
							{currentImg === i && (
								<>
									<Image bgUrl={el.image} />
									<BannerOverlay>
										<BannerContent appear={currentImg === i}>
											<h2>{el.title}</h2>
											<h3>{el.subtitle}</h3>
											<CustomButton variant="default">Go check</CustomButton>
										</BannerContent>
									</BannerOverlay>
								</>
							)}
						</BannerImage>
					);
				})}
				<NavigationIcons>
					<NavigationIcon onClick={handlePrevSlide}>
						<NavigateBeforeRoundedIcon className="homeBannerNavigation__icon" />
					</NavigationIcon>
					<NavigationIcon onClick={handleNextSlide}>
						<NavigateNextRoundedIcon className="homeBannerNavigation__icon" />
					</NavigationIcon>
				</NavigationIcons>
				<Dots>
					{bannerData.map((_, i) => (
						<Dot
							key={i}
							onClick={() => handleDotClick(i)}
							active={i === currentImg ? true : false}
						/>
					))}
				</Dots>
			</BannerWrapper>
			<Bar style={{ width: `${width}%` }} />
		</Container>
	);
};

export default BannerSlider;

const Container = styled.div`
	position: relative;
	min-height: 50vh;
	width: 100%;
`;

const BannerWrapper = styled.div`
	position: relative;
	display: flex;
	height: 100%;
	overflow: hidden;
	background: ${({ theme }) => theme.surface.primary};
`;

const BannerImage = styled.div`
	position: relative;
	display: flex;
	width: 100%;
	height: 100%;
	opacity: ${({ active }) => (active ? "1" : "0")};
	transition: all 0.3s cubic-bezier(0.5, 1, 0.89, 1);
`;

const BannerOverlay = styled.div`
	position: absolute;
	padding: 120px 20px;
	width: 100%;
	inset: 0;
	width: 70%;
	background-image: linear-gradient(
		to right,
		rgba(0, 0, 0, 0.9),
		rgba(0, 0, 0, 0.8) 25%,
		rgba(0, 0, 0, 0)
	);

	@media (min-width: 768px) {
		width: 50%;
		padding: 12% 7%;
	}
`;

const BannerContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 20px 0;
	animation: ${({ appear }) => appear && "appear 0.4s linear"};
	color: rgba(255, 255, 255, 0.8);

	> h2 {
		color: ${({ theme }) => theme.color.white};
		font-size: calc(20px + 1vw);
		font-weight: 400;
	}
	> h3 {
		color: ${({ theme }) => theme.color.white};
		opacity: 0.65;
		font-size: calc(16px + 0.25vw);
		font-weight: 300;
	}

	@keyframes appear {
		0% {
			opacity: 0;
			transform: translateY(-10px);
		}
		100% {
			opacity: 1;
			transform: none;
		}
	}
`;

const Image = styled.div`
	position: relative;
	background-image: ${({ bgUrl }) => `url(${bgUrl})`};
	background-size: cover;
	background-position: 50% 40%;
	background-repeat: no-repeat;
	width: 100vw;
	height: 49.2vw;
	min-height: 520px;
	max-height: 725px;

	&:after {
		content: "";
		position: absolute;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.3);
	}
`;

const Bar = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	height: 2px;
	background: ${({ theme }) => theme.color.primary};
	border-radius: 10px; ;
`;

const NavigationIcons = styled.div`
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: space-between;
	bottom: 2%;
	left: 8%;
	right: 8%;
	transform: translateY(-50%);
`;

const NavigationIcon = styled(ButtonBase)`
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${({ theme }) => theme.surface.secondary};
	box-shadow: ${({ theme }) => theme.boxShadow.primary};
	padding: 7px 4px;
	border-radius: 4px;

	span {
		color: ${({ theme }) => theme.color.white};
	}

	:hover {
		span {
			background-color: rgba(255, 255, 255, 0.1);
		}
	}

	.homeBannerNavigation__icon {
		font-size: 25px;
	}
`;

const Dots = styled.div`
	position: absolute;
	bottom: 1.5%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	align-items: center;
	gap: 0 15px;
	padding: 10px 12px;
	background: ${({ theme }) => theme.surface.secondary};
	box-shadow: ${({ theme }) => theme.boxShadow.primary};
`;

const Dot = styled.div`
	height: 10px;
	width: 10px;
	background: ${({ theme, active }) =>
		active ? theme.color.primary : "rgba(80,80,80,0.8)"};
	cursor: pointer;
	box-shadow: ${({ theme }) => theme.boxShadow.primary};
	transition: all 0.1s ease-in-out;

	:hover {
		filter: brightness(1.3);
	}
`;
