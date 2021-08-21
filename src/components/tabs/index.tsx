import { ButtonBase } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import styled from "styled-components";

interface tab {
	title: string;
	icon?;
}

interface pageProps {
	tabs: tab[];
	currentTab;
	setCurrentTab;
	fullWidth?: boolean;
	background?: "primary" | "secondary";
}

const Tabs = ({
	tabs,
	currentTab,
	setCurrentTab,
	fullWidth,
	background,
}: pageProps) => {
	const tabRef = useRef(null);
	const [tabOffsetWidth, setTabOffsetWidth] = useState<number>(110);

	useEffect(() => {
		if (tabRef.current) {
			const changeTabWidth = () =>
				setTabOffsetWidth(tabRef.current.offsetWidth);

			setTabOffsetWidth(tabRef.current.offsetWidth);

			window.addEventListener("resize", changeTabWidth);

			return () => {
				window.removeEventListener("resize", changeTabWidth);
			};
		}
	}, [tabOffsetWidth, tabRef]);

	return (
		<TabsList fullWidth={fullWidth} background={background}>
			{tabs.map((tab, i) => (
				<Tab
					component="li"
					key={`${tab.title}-${i}`}
					ref={tabRef}
					onClick={() => setCurrentTab(i)}
					active={currentTab === i ? 1 : 0}
				>
					{tab.icon && <tab.icon className="ProductDetailsContentTab__icon" />}
					{tab.title}
				</Tab>
			))}
			<TabIndicator
				style={{
					width: `${tabOffsetWidth}px`,
					left: `${tabOffsetWidth * currentTab}px`,
				}}
			/>
		</TabsList>
	);
};

export default Tabs;

const TabsList = styled.ul`
	position: relative;
	display: grid;
	border-bottom: ${({ background }) =>
		!background && "1px solid rgb(75, 74, 74)"};
	grid-auto-flow: column;
	height: 65px;
	border-radius: 2px;
	grid-template-columns: repeat(auto-fit, minmax(95px, 1fr));
	background: ${({ theme, background }) =>
		background === "primary"
			? theme.background.primary
			: background === "secondary"
			? theme.background.secondary
			: null};
	overflow-x: scroll;

	&::-webkit-scrollbar {
		display: none;
	}

	@media ${({ theme }) => theme.breakpoints.sm} {
		grid-template-columns: repeat(auto-fill, minmax(120px, 140px));
	}
`;

const Tab = styled(ButtonBase)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	min-width: 95px;
	padding: 6px 12px;
	text-align: center;
	font-size: ${({ theme }) => `calc(${theme.font.xxs} + 2px)`};
	font-weight: 500;
	color: ${({ theme }) => theme.color.white};
	opacity: ${({ active }) => (active ? "1" : "0.65")};
	transition: all 0.2s cubic-bezier(0.5, 1, 0.89, 1);

	.Tab__icon {
		font-size: ${({ theme }) => `calc(${theme.font.xs} + 3px)`};
		margin-bottom: 6px;
	}
`;

const TabIndicator = styled.span`
	position: absolute;
	bottom: 0;
	background: ${({ theme }) => theme.color.primary};
	height: 2px;
	border-radius: 2px;
	transition: all 0.2s cubic-bezier(0.5, 1, 0.89, 1);
`;
