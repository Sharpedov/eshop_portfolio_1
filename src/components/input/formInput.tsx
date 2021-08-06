import React, { useState } from "react";
import styled from "styled-components";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CustomIconButton from "../customIconButton";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

interface pageProps {
	label: string;
	error?: string;
	type?: string;
	field?: {
		name;
		onChange;
		onBlur;
		ref;
		value;
	};
	disabled?;
	dummy?: boolean;
	defaultValue?: string;
}

const FormInput = ({
	dummy,
	label,
	type,
	error,
	field,
	disabled,
	defaultValue,
}: pageProps) => {
	if (dummy) {
		return (
			<Container disabled={disabled}>
				<Input type={type} value={defaultValue} disabled={disabled} />
				<Label error={error}>
					<TextLabel isFilled={defaultValue}>{label}</TextLabel>
				</Label>
			</Container>
		);
	}
	const { name, onChange, onBlur, ref, value } = field;
	const [showPassword, setShowPassword] = useState<boolean>(false);

	return (
		<Container error={error}>
			<Input
				name={name}
				onChange={onChange}
				onBlur={onBlur}
				ref={ref}
				type={showPassword ? "text" : type}
				error={error}
				value={defaultValue || value}
				disabled={disabled}
				isPasswordType={type === "password"}
			/>
			<Label error={error}>
				<TextLabel isFilled={defaultValue || value}>{label}</TextLabel>
			</Label>
			<p>{error}</p>

			{type === "password" && (
				<ShowPasswordBtn>
					<CustomIconButton
						disableFocus
						onClick={() => setShowPassword((prev) => !prev)}
						ariaLabel="Show password"
						Icon={showPassword ? VisibilityOffIcon : VisibilityIcon}
						size="small"
					/>
				</ShowPasswordBtn>
			)}
		</Container>
	);
};

export default FormInput;

const Container = styled.div`
	position: relative;
	/* background: rgba(17, 17, 17, 0.55); */
	background: ${({ disabled }) =>
		disabled ? "rgba(36, 36, 36, 0.75)" : "rgba(0, 0, 0, 0.15)"};
	border: 1px solid rgba(48, 48, 48, 0.45);
	border-radius: 2px;
	height: 48px;
	max-width: 402px;
	width: 100%;
	transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0ms;

	> p {
		position: absolute;
		color: rgba(255, 0, 0, 0.6);
		font-size: 13px;
		font-weight: ${({ theme }) => theme.weight.bold};
		opacity: ${({ error }) => (error ? "1" : "0")};
		transform: ${({ error }) =>
			error ? "translateY(1px)" : "translateY(-5px)"};
		width: 100%;
		text-align: left;
		transition: all 0.2s ease-in-out;
	}
`;

const Label = styled.label`
	position: absolute;
	inset: 0;
	pointer-events: none;
	background-color: transparent;
	overflow: hidden;
	padding: 0 16px;
	transition: inherit;

	&::before {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 0;
		border-bottom: 0 solid rgba(90, 90, 90, 0.25);
		border-radius: 1px;
		transition: inherit;
	}

	&::after {
		content: "";
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 0;
		border-bottom: 2px solid
			${({ theme, error }) =>
				error ? "rgba(255,0,0,0.6)" : theme.color.primary};
		border-radius: 1px;
		transition: inherit;
	}
`;

const TextLabel = styled.text`
	position: absolute;
	top: 50%;
	color: #808080;
	opacity: 0.9;
	transform: ${({ isFilled }) =>
		isFilled ? "translateY(-17px)" : "translateY(-50%)"};
	font-size: ${({ isFilled }) => (isFilled ? `13px` : "16px")};
	transition: inherit;

	@media (min-width: 480px) {
	}
`;

const Input = styled.input`
	width: 100%;
	height: 100%;
	background: inherit;
	outline: none;
	border: none;
	padding: ${({ isPasswordType }) =>
		isPasswordType ? "10px 46px 0 16px" : "10px 16px 0 16px"};
	font-size: 16px;
	color: ${({ theme }) => theme.color.white};
	caret-color: ${({ error }) => error && "rgba(255,0,0,0.6)"};

	&:hover + ${Label} {
		&::before {
			border-bottom-width: 1.5px;
		}
	}

	&:focus + ${Label} {
		${TextLabel} {
			transform: translateY(-17px);
			font-size: 13px;
			color: ${({ error }) => error && "rgba(255,0,0,0.6)"};
		}

		&::after {
			left: 0;
			right: 0;
			width: 100%;
		}
	}
`;

const ShowPasswordBtn = styled.div`
	position: absolute;
	top: 50%;
	right: 0;
	transform: translate(-10px, -50%);
`;
