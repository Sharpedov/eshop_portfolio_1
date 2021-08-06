import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { throttle } from "lodash";
import ClearIcon from "@material-ui/icons/Clear";
import { addSearchTerm } from "src/store/slices/searchSlice";

interface pageProps {
	onClick?: () => void;
}

const SearchInput = ({ onClick }: pageProps) => {
	const inputRef = useRef(null);
	const dispatch = useDispatch();
	const [showClearBtn, setShowClearBtn] = useState<boolean>(false);

	const handleInputChange = useCallback(
		throttle(() => {
			if (inputRef.current) {
				const term = inputRef.current.value;

				setShowClearBtn(term.length >= 1 ? true : false);
				dispatch(addSearchTerm(term));
			}
		}, 500),
		[inputRef, dispatch]
	);

	const handleInputClear = useCallback(() => {
		inputRef.current.value = "";
		dispatch(addSearchTerm(""));
		setShowClearBtn(false);
		inputRef.current.focus();
	}, [inputRef, dispatch, showClearBtn]);

	return (
		<SearchInputContainer onClick={onClick}>
			<Input
				ref={inputRef}
				onChange={handleInputChange}
				placeholder="Search"
				isFilled={showClearBtn}
			/>
			<Label></Label>
			{showClearBtn && (
				<ClearButton onClick={handleInputClear}>
					<ClearIcon className="searchInput_icon" />
				</ClearButton>
			)}
		</SearchInputContainer>
	);
};

export default SearchInput;

const SearchInputContainer = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 36px;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 2px;
	transition: all 0.2s ease-in;

	@media (min-width: 1024px) {
		height: 40px;
	}
`;

const Label = styled.label`
	position: absolute;
	inset: 0;
	pointer-events: none;
	overflow: hidden;
	transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0ms;

	&::after {
		content: "";
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 0;
		height: 2px;
		background: ${({ theme }) => theme.color.primary};
		transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	}
`;

const Input = styled.input`
	text-align: center;
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, 0.1);
	border: none;
	color: rgba(255, 255, 255, 0.6);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 16px;
	border-radius: inherit;
	padding: 0 15px;
	/* padding: ${({ isFilled }) =>
		isFilled ? "10px 35px 10px 10px" : "0 10px"}; */

	&::placeholder {
		font-size: 15px;
		opacity: 0.8;
		text-align: left;
	}

	&:focus + ${Label} {
		::after {
			left: 0;
			right: 0;
			width: 100%;
		}
	}

	::-webkit-input-placeholder {
		color: inherit;
	}
	::-moz-placeholder {
		color: inherit;
	}
	:-ms-input-placeholder {
		color: inherit;
	}
	:-moz-placeholder {
		color: inherit;
	}
`;

const ClearButton = styled.div`
	position: absolute;
	top: 50%;
	right: 0;
	transform: translate(-10px, -50%);
	display: grid;
	place-items: center;
	cursor: pointer;
	height: inherit;

	.searchInput_icon {
		color: ${({ theme }) => theme.color.primary};
		font-size: 18px;
		transition: transform 0.2s ease;
	}

	&:hover {
		.searchInput_icon {
			transform: scale(1.2);
		}
	}
`;
