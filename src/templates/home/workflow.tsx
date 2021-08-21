import React from "react";
import styled from "styled-components";

interface pageProps {}

const data = [
	{
		id: 1,
		title: "Lorem ipsum dolor sit amet.",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet tellus non velit fermentum, ut auctor ligula viverra.",
	},
	{
		id: 2,
		title: "Lorem ipsum dolor sit amet.",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet tellus non velit fermentum, ut auctor ligula viverra.",
	},
	{
		id: 3,
		title: "Lorem ipsum dolor sit amet.",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet tellus non velit fermentum, ut auctor ligula viverra.",
	},
	{
		id: 4,
		title: "Lorem ipsum dolor sit amet.",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet tellus non velit fermentum, ut auctor ligula viverra.",
	},
];

const Workflow = ({}: pageProps) => {
	return (
		<Container>
			<Heading>
				<h2>Four quick steps</h2>
				<p>Meet the feature of our project</p>
			</Heading>
			<Wrapper>
				{data.map((item) => (
					<Card key={item.id}>
						<IconBox>{`0${item.id}`}</IconBox>
						<CardContent>
							<h3>{item.title}</h3>
							<p>{item.text}</p>
						</CardContent>
					</Card>
				))}
			</Wrapper>
		</Container>
	);
};

export default Workflow;

const Container = styled.section`
	background-color: ${({ theme }) => theme.background.secondary};
	background-image: url("/patternBG.png");
	background-repeat: no-repeat;
	background-position: center center;
	background-size: cover;
	position: relative;
	padding: 70px 0;
`;

const Heading = styled.div`
	margin-bottom: 55px;
	text-align: center;
	color: ${({ theme }) => theme.color.white};

	> h2 {
		margin-bottom: 15px;
		text-transform: uppercase;
		font-size: ${({ theme }) => `calc( ${theme.font.xxs} + 2px)`};
		font-weight: 600;
		opacity: 0.65;
	}
	> p {
		font-size: ${({ theme }) => `calc( ${theme.font.xs} + 2px)`};
		font-weight: 600;
	}
`;

const Wrapper = styled.div`
	display: grid;
	margin: 0 auto;
	max-width: 1400px;
	width: 100%;
	grid-gap: 50px 20px;
	grid-template-columns: repeat(1, 1fr);

	@media ${({ theme }) => theme.breakpoints.md} {
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 35px 20px;
	}

	@media ${({ theme }) => theme.breakpoints.lg} {
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 1px 20px;
	}
`;

const Card = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 80%;
	padding: 0 4px;
	margin: 0 auto;

	@media ${({ theme }) => theme.breakpoints.md} {
		align-items: start;
	}

	@media ${({ theme }) => theme.breakpoints.lg} {
		::before {
			content: "";
			position: absolute;
			top: 5px;
			left: 68px;
			background-repeat: no-repeat;
			background-position: center center;
			width: 215px;
			height: 60px;
		}

		:nth-of-type(2n-1)::before {
			background-image: url("/arrowOdd.svg");
		}
		:nth-of-type(2n)::before {
			background-image: url("/arrowEven.svg");
		}
		:last-child::before {
			display: none;
		}
	}
`;

const IconBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${({ theme }) => theme.color.primary};
	color: ${({ theme }) => theme.color.white};
	width: 100%;
	font-size: 2.4rem;
	max-width: 47px;
	height: 47px;
	border-radius: 20px;
	margin-bottom: 20px;
`;

const CardContent = styled.div`
	display: flex;
	flex-direction: column;
	color: ${({ theme }) => theme.color.white};

	> h3 {
		text-align: center;
		margin-bottom: 20px;
		font-weight: 500;
		font-size: 1.6rem;
	}
	> p {
		text-align: center;
		font-weight: 400;
		font-size: 1.5rem;
		opacity: 0.65;
	}

	@media ${({ theme }) => theme.breakpoints.md} {
		> h3 {
			text-align: left;
		}

		> p {
			text-align: left;
		}
	}
	@media ${({ theme }) => theme.breakpoints.lg} {
		> h3 {
			text-align: left;
			font-size: 1.7rem;
		}

		> p {
			text-align: left;
		}
	}
`;
