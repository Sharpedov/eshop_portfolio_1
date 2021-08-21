import { Button } from "@material-ui/core";
import React, { useMemo } from "react";
import styled from "styled-components";
import Link from "next/link";
import SpinnerLoading from "./loadingIndicators/spinnerLoading";

interface pageProps {
	children?: React.ReactNode;
	variant?: "contained" | "outlined" | "withIcon" | "toolkit" | "default";
	color?: "primary" | "secondary";
	ariaLabel?: string;
	type?: string;
	size?: "large" | "medium" | "small";
	onClick?: () => void;
	href?: string;
	loading?: boolean;
	disabled?: boolean;
	Icon?;
	fullWidth?: boolean;
	left?: boolean;
	isActive?: boolean;
	scroll?: boolean;
}

const CustomButton = ({
	children,
	variant,
	color,
	ariaLabel,
	type,
	size,
	onClick,
	href,
	loading,
	disabled,
	Icon,
	fullWidth,
	left,
	isActive,
	scroll,
}: pageProps) => {
	const ButtonElement = useMemo(() => {
		switch (variant) {
			case "contained": {
				return (
					<ContainedButton
						onClick={onClick}
						variant="contained"
						aria-label={ariaLabel}
						type={type}
						size={size}
						color={color}
						disabled={loading || disabled}
						fullwidth={fullWidth ? 1 : 0}
						loading={loading}
					>
						{loading && (
							<SpinnerLoading
								size={size === "small" ? 28 : size === "medium" ? 30 : 32}
							/>
						)}
						<text>{children}</text>
					</ContainedButton>
				);
			}
			case "outlined": {
				return (
					<OutlinedButton
						onClick={onClick}
						variant="outlined"
						aria-label={ariaLabel}
						type={type}
						size={size}
						color={color}
						disabled={loading || disabled}
						fullwidth={fullWidth ? 1 : 0}
					>
						{loading ? (
							<SpinnerLoading
								size={size === "small" ? 28 : size === "medium" ? 30 : 32}
							/>
						) : (
							children
						)}
					</OutlinedButton>
				);
			}
			case "toolkit": {
				return (
					<ToolkitButton
						onClick={onClick}
						aria-label={ariaLabel}
						type={type}
						size={size}
						color={color}
						disabled={loading || disabled}
						fullwidth={fullWidth ? 1 : 0}
					>
						{loading ? (
							<SpinnerLoading
								size={size === "small" ? 28 : size === "medium" ? 30 : 32}
							/>
						) : (
							<>
								{Icon && <Icon className="customButton__icon" />}
								{children}
							</>
						)}
					</ToolkitButton>
				);
			}

			default:
				return (
					<DefaultButton
						onClick={onClick}
						aria-label={ariaLabel}
						type={type}
						size={size}
						color={color}
						disabled={loading || disabled}
						iswidthicon={Icon ? 1 : 0}
						fullwidth={fullWidth ? 1 : 0}
						left={left ? 1 : 0}
						isactive={isActive ? 1 : 0}
					>
						{loading ? (
							<SpinnerLoading
								size={size === "small" ? 28 : size === "medium" ? 30 : 32}
							/>
						) : (
							<>
								{Icon && <Icon className="customButton__icon" />}
								{children}
							</>
						)}
					</DefaultButton>
				);
		}
	}, [
		variant,
		color,
		ariaLabel,
		type,
		size,
		onClick,
		loading,
		disabled,
		Icon,
		fullWidth,
		left,
		isActive,
		children,
	]);

	return href ? (
		<Link href={href} scroll={scroll}>
			{ButtonElement}
		</Link>
	) : (
		ButtonElement
	);
};

export default CustomButton;

const StyledButton = styled(Button)`
	height: ${({ size }) =>
		size === "small" ? "40px" : size === "medium" ? "44px" : "48px"};

	padding: ${({ size }) =>
		size === "small" ? "0 14px" : size === "medium" ? "0 18px" : "0 22px"};
	white-space: nowrap;
	width: ${({ fullwidth }) => (fullwidth ? "100%" : "auto")};
	justify-content: ${({ left }) => left && "start"};
	text-transform: none;
	transition: all 0.2s ease;

	&:disabled {
		background-color: rgba(0, 0, 0, 0.3);
		border-color: rgba(0, 0, 0, 0.3);
		color: rgba(255, 255, 255, 0.65);

		&:after {
			background-color: rgba(0, 0, 0, 0.3);
		}
	}
	> span {
		display: ${({ loading }) => (loading ? "grid" : "flex")};
		grid-template-columns: 1fr;
		place-items: ${({ loading }) => (loading ? "center" : "none")};
		font-size: ${({ size }) =>
			size === "small" ? "1.4rem" : size === "medium" ? "1.5rem" : "1.6rem"};
		margin: 0 auto;
		font-weight: 400;

		> text {
			opacity: ${({ loading }) => (loading ? "0" : "1")};
			height: ${({ loading }) => (loading ? "0" : "auto")};
		}
	}
`;

const ContainedButton = styled(StyledButton)`
	position: relative;
	border: 4px solid
		${({ theme, color }) =>
			color === "secondary" ? theme.color.secondary : theme.color.primary};
	border-radius: 2px;
	transition: all 0.2s ease;
	color: #fff;
	z-index: 1;

	&:after {
		content: "";
		position: absolute;
		inset: 0;
		background-color: ${({ theme, color }) =>
			color === "secondary" ? theme.color.secondary : theme.color.primary};
		z-index: -1;
		transition: all 0.2s ease;
	}

	@media ${({ theme }) => theme.breakpoints.sm} {
		&:hover {
			color: ${({ theme }) => theme.color.white};
			background-color: transparent;
			&:after {
				background-color: transparent;
			}
		}
	}
`;

const OutlinedButton = styled(StyledButton)`
	color: ${({ theme, color }) =>
		color === "secondary" ? theme.color.secondary : theme.color.primary};
	border: 1px solid rgba(147, 148, 150, 0.3);

	border-radius: 2px;
	box-sizing: border-box;
	text-transform: none;
	transition: all 0.2s cubic-bezier(0.5, 1, 0.89, 1);

	&:hover,
	&:focus {
		background-color: rgba(255, 255, 255, 0.04);
	}
`;

const ToolkitButton = styled(StyledButton)`
	border-radius: 0;
	color: ${({ theme }) => theme.color.white};
	height: 100%;
	padding: ${({ size }) =>
		size === "small" ? "2px 4px" : size === "medium" ? "4px 6px" : "6px 8px"};
	border-radius: 2px;

	.customButton__icon {
		margin-right: 5px;
		font-size: ${({ size }) =>
			size === "small" ? "1.7rem" : size === "medium" ? "1.9rem" : "2rem"};
	}

	&:hover {
		background: rgba(255, 255, 255, 0.05);
	}
`;

const DefaultButton = styled(StyledButton)`
	border-radius: ${({ iswidthicon }) => (iswidthicon ? "0px" : "2px")};
	color: ${({ theme }) => theme.color.white};
	background-color: ${({ isactive }) =>
		isactive && "rgba(255, 255, 255, 0.05)"};

	.customButton__icon {
		margin-right: 24px;
		opacity: ${({ isactive }) => (isactive ? "1" : "0.65")};
		font-size: 2.4rem;
	}

	&:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
`;
