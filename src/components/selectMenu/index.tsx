import { ButtonBase } from "@material-ui/core";
import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

interface pageProps {
	options;
	setValue;
	activeOption;
	isOpen;
	onClose: () => void;
}

const SelectMenu = ({
	options,
	setValue,
	activeOption,
	isOpen,
	onClose,
}: pageProps) => {
	const selectRef = useRef(null);

	const escapeListener = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		},
		[onClose]
	);

	useEffect(() => {
		const pageClickEvent = (e) => {
			if (selectRef.current !== null && !selectRef.current.contains(e.target)) {
				onClose();
			}
		};

		const timeout = () =>
			setTimeout(() => {
				if (isOpen) {
					window.addEventListener("click", pageClickEvent);
					document.addEventListener("keydown", escapeListener);
				}
			}, 1);
		timeout();

		return () => {
			window.removeEventListener("click", pageClickEvent);
			document.addEventListener("keydown", escapeListener);
		};
	}, [isOpen, selectRef, escapeListener, onClose]);

	return (
		<CSSTransition
			in={isOpen}
			timeout={200}
			classNames="selectMenu-"
			unmountOnExit={true}
		>
			<Container isOpen={isOpen} ref={selectRef}>
				{options.map((option, i) => (
					<Option
						key={`${option.value}-${i}`}
						active={option.value === activeOption.value}
						onClick={() => {
							setValue(option);
							onClose();
						}}
					>
						<text>{option.value}</text>
					</Option>
				))}
			</Container>
		</CSSTransition>
	);
};

export default SelectMenu;

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	position: absolute;
	top: 0;
	left: 0;
	background: ${({ theme }) => theme.surface.secondary};
	border-radius: 5px;
	box-shadow: ${({ theme }) => theme.boxShadow.primary};
	width: 150px;
	/* width: calc(100% + 30px); */
	z-index: 5;
	overflow: hidden;
`;

const Option = styled(ButtonBase)`
	height: 42px;
	padding: 5px 10px;
	background: ${({ active }) => active && "rgba(255, 255, 255, 0.03)"};
	transition: background 0.1s ease-in-out;
	font-size: 15px;
	font-family: ${({ theme }) => theme.family.roboto};

	> text {
		color: ${({ theme, active }) =>
			active ? theme.color.primary : theme.color.white};
	}

	&:hover {
		background: rgba(255, 255, 255, 0.06);
	}
`;
