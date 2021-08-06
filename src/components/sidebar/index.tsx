import React from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import CustomIconButton from "../customIconButton";
import CloseIcon from "@material-ui/icons/Close";
import { DisableScrollbar } from "src/utils/disableScrollbar";

interface pageProps {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
	headerText: string;
	displayNone?: number;
	slideFrom: "Right" | "Bottom";
}

const Sidebar = ({
	children,
	isOpen,
	onClose,
	headerText,
	displayNone,
	slideFrom,
}: pageProps) => {
	DisableScrollbar(isOpen);

	return (
		<>
			<CSSTransition
				in={isOpen}
				timeout={300}
				classNames={`sidebar${slideFrom}-`}
				unmountOnExit={true}
			>
				<Container displayNone={displayNone}>
					<HeaderBreak>
						<>
							<span>{headerText}</span>
							<HeaderIcon>
								<CustomIconButton
									ariaLabel="Close cart sidebar"
									onClick={() => onClose()}
									Icon={CloseIcon}
								/>
							</HeaderIcon>
						</>
					</HeaderBreak>
					<Wrapper>{children}</Wrapper>
				</Container>
			</CSSTransition>

			<Background
				isOpen={isOpen}
				onClick={() => onClose()}
				displayNone={displayNone}
			/>
		</>
	);
};

export default Sidebar;

const Background = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 100;
	visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
	opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
	transition: all 0.25s 0.05s cubic-bezier(0.5, 1, 0.89, 1);

	@media (min-width: ${({ displayNone }) => `${displayNone}px`}) {
		display: none;
	}
`;

const Container = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 55px;
	max-width: 450px;
	width: 100%;
	box-shadow: ${({ theme }) => theme.boxShadow.primary};
	background: ${({ theme }) => theme.surface.primary};
	z-index: 101;

	&::-webkit-scrollbar {
		display: none;
	}

	@media (min-width: 576px) {
		bottom: 0;
	}

	@media (min-width: ${({ displayNone }) => `${displayNone}px`}) {
		display: none;
	}
`;

const HeaderBreak = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 52px;
	border-bottom: 1px solid rgb(0 0 0 / 20%);
	box-shadow: 0 0 1.5625vw rgb(0 0 0 / 20%);

	> span {
		font-size: ${({ theme }) => `calc(${theme.font.s} - 3px)`};
		font-weight: 700;
	}

	@media (min-width: 768px) {
		> span {
			font-size: ${({ theme }) => `calc(${theme.font.s})`};
		}
	}

	@media (min-width: 1024px) {
		height: 64px;
	}
`;

const HeaderIcon = styled.div`
	position: absolute;
	left: 0;
	transform: translateX(8px);
`;

const Wrapper = styled.div`
	position: absolute;
	top: 52px;
	bottom: 0;
	right: 0;
	left: 0;
	display: flex;
	flex-direction: column;

	@media (min-width: 1024px) {
		top: 64px;
	}
`;
