import { ButtonBase } from "@material-ui/core";
import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

interface pageProps {
	options;
	setValue;
	activeOption;
	isOpen: boolean;
	onClose: () => void;
}

const containerAnimation = {
	show: {
		opacity: 1,
		scale: 1,
		originX: 0.1,
		originY: 0.1,
		transition: { duration: 0.2 },
	},
	hidden: {
		opacity: 0,
		scale: 0.5,
		originX: 0.1,
		originY: 0.1,
		transition: { duration: 0.25 },
	},
};

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

		if (isOpen) {
			window.addEventListener("click", pageClickEvent);
			document.addEventListener("keydown", escapeListener);
		}

		return () => {
			window.removeEventListener("click", pageClickEvent);
			document.addEventListener("keydown", escapeListener);
		};
	}, [isOpen, selectRef, escapeListener, onClose]);

	return (
		<AnimatePresence>
			{isOpen && (
				<Container
					variants={containerAnimation}
					initial="hidden"
					animate="show"
					exit="hidden"
					ref={selectRef}
				>
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
			)}
		</AnimatePresence>
	);
};

export default SelectMenu;

const Container = styled(motion.div)`
	display: grid;
	grid-template-columns: 1fr;
	position: absolute;
	top: 0;
	left: 0;
	background: ${({ theme }) => theme.background.secondary};
	border-radius: 0 5px 5px;
	box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
		0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
	width: 150px;
	z-index: 5;
	overflow: hidden;
`;

const Option = styled(ButtonBase)`
	height: 42px;
	padding: 5px 10px;
	background: ${({ active }) => active && "rgba(255, 255, 255, 0.03)"};
	font-size: 1.5rem;
	font-weight: 400;

	> text {
		color: ${({ theme, active }) =>
			active ? theme.color.primary : theme.color.white};
	}

	&:hover {
		background: rgba(255, 255, 255, 0.06);
	}
`;
