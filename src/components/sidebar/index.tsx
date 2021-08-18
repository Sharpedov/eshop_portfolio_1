import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CustomIconButton from "../customIconButton";
import CloseIcon from "@material-ui/icons/Close";
import { DisableScrollbar } from "src/utils/disableScrollbar";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface pageProps {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
	headerText: string;
	displayNone?: number;
	slideFrom: "Right" | "Bottom";
}

const backdropAnimation = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
	},
};
const sidebarAnimation = {
	hidden: { x: "100%" },
	show: {
		x: "0",
	},
	transition: {
		type: "spring",
		bounce: 0,
		duration: 0.5,
	},
};

const Sidebar = ({
	children,
	isOpen,
	onClose,
	headerText,
	displayNone,
}: pageProps) => {
	const [isBrowser, setIsBrowser] = useState<boolean>(false);
	DisableScrollbar(isOpen);

	useEffect(() => {
		setIsBrowser(true);
	}, []);

	useEffect(() => {
		const escapeListener = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		if (onClose) {
			document.addEventListener("keydown", escapeListener);
		}

		return () => {
			document.removeEventListener("keydown", escapeListener);
		};
	}, [onClose]);

	return (
		isBrowser &&
		createPortal(
			<>
				<AnimatePresence>
					{isOpen && (
						<>
							<Backdrop
								onClick={onClose}
								displayNone={displayNone}
								variants={backdropAnimation}
								initial="hidden"
								animate="show"
								exit="hidden"
							/>
							<SidebarContainer
								variants={sidebarAnimation}
								initial="hidden"
								animate="show"
								exit="hidden"
								transition="transition"
							>
								<Header>
									<span>{headerText}</span>
									<HeaderIcon>
										<CustomIconButton
											ariaLabel="Close cart sidebar"
											onClick={() => onClose()}
											Icon={CloseIcon}
										/>
									</HeaderIcon>
								</Header>
								<ContentWrapper>{children}</ContentWrapper>
							</SidebarContainer>
						</>
					)}
				</AnimatePresence>
			</>,
			document.getElementById("sidebar")
		)
	);
};

export default Sidebar;

const Backdrop = styled(motion.div)`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 100;

	@media (min-width: ${({ displayNone }) => `${displayNone}px`}) {
		display: none;
	}
`;

const SidebarContainer = styled(motion.div)`
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

const Header = styled.div`
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

const ContentWrapper = styled.div`
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
