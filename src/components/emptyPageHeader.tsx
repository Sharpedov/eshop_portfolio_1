import React from "react";
import styled from "styled-components";

interface pageProps {
	title;
	Icon;
}

const EmptyPageHeader = ({ title, Icon }: pageProps) => {
	return (
		<Container>
			<IconWrapper>
				<Icon className="favouriteEmpty__icon" />
			</IconWrapper>
			<span>{title}</span>
		</Container>
	);
};

export default EmptyPageHeader;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	> span {
		font-size: ${({ theme }) => `calc(${theme.font.xs} + 1vw)`};
		margin-top: 20px;
	}
`;

const IconWrapper = styled.div`
	display: grid;
	place-items: center;
	border: 1px dashed ${({ theme }) => theme.white};
	border-radius: 12px;
	padding: 20px;

	.favouriteEmpty__icon {
		font-size: ${({ theme }) => `calc(${theme.font.m})`};
	}
`;
