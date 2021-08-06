import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import CustomIconButton from "../customIconButton";
import { DisableScrollbar } from "src/utils/disableScrollbar";
import ReactModal from "react-modal";

interface pageProps {
	children: React.ReactNode;
	show: boolean;
	onClose: () => void;
	shouldBeCloseOutside?: boolean;
	title: string;
}

const Modal = ({
	show,
	onClose,
	shouldBeCloseOutside,
	children,
	title,
}: pageProps) => {
	const [isBrowser, setIsBrowser] = useState<boolean>(false);
	DisableScrollbar(show);

	const customStyles = {
		content: {
			transform: "translate(-50%, -50%)",
			border: "0",
			padding: "0",
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			overflow: "auto",
			WebkitOverflowScrolling: "touch",
			outline: "none",
		},
		overlay: {
			backgroundColor: "rgba(0, 0, 0, 0.5)",
		},
	};

	useEffect(() => {
		setIsBrowser(true);
	}, []);

	return (
		isBrowser && (
			<StyledModal
				closeTimeoutMS={300}
				isOpen={show}
				onRequestClose={onClose}
				shouldCloseOnOverlayClick={shouldBeCloseOutside}
				style={customStyles}
			>
				<Box show={show}>
					<BoxHeading>
						<Title>
							<h3>{title}</h3>
						</Title>
						<CustomIconButton
							onClick={onClose}
							ariaLabel="Close modal"
							Icon={CloseIcon}
							size="medium"
							disableFocus={true}
						/>
					</BoxHeading>
					<BoxContent>{children}</BoxContent>
				</Box>
			</StyledModal>
		)
	);
};

export default Modal;

const StyledModal = styled(ReactModal)`
	display: grid;
	place-items: center;
	position: fixed;
	inset: 0;
	z-index: 500;
	border: none;
`;

const Box = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	background-color: ${({ theme }) => theme.surface.secondary};
	transform: ${({ show }) => (show ? "scale(1)" : "scale(0.45)")};
	border-radius: 4px;
	box-shadow: ${({ theme }) => theme.boxShadow.primary};
	width: 85vw;
	max-width: 325px;
	transition: all 0.2s ease;

	@media (min-width: 480px) {
		min-width: 325px;
	}
	@media (min-width: 768px) {
		min-width: 350px;
	}
	@media (min-width: 1024px) {
		min-width: 420px;
	}
`;

const BoxHeading = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px 12px 8px 16px;
	background-color: ${({ theme }) => theme.surface.secondary};
`;

const Title = styled.div`
	> h3 {
	}
`;

const BoxContent = styled.div`
	padding: 12px 18px 18px;
	background-color: ${({ theme }) => theme.surface.primary};
`;
