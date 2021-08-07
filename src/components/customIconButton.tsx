import React, { useMemo } from "react";
import { IconButton } from "@material-ui/core";
import styled from "styled-components";
import Link from "next/link";

interface pageProps {
	Icon?;
	size?: "small" | "medium" | "large";
	onClick?: () => void;
	href?: string;
	active?: boolean;
	ariaLabel: string;
	disableFocus?: boolean;
	loading?: boolean;
}

const CustomIconButton = ({
	Icon,
	size,
	onClick,
	href,
	active,
	ariaLabel,
	disableFocus,
	loading,
}: pageProps) => {
	const IconButtonElement = useMemo(
		() => (
			<StyledIconButton
				tabIndex={disableFocus && "-1"}
				size={size}
				onClick={loading ? null : onClick}
				active={active ? 1 : 0}
				aria-label={ariaLabel}
				loading={loading}
			>
				<Icon className="customIconButton__icon" />
			</StyledIconButton>
		),
		[Icon, size, onClick, active, ariaLabel, loading, disableFocus]
	);

	return href ? (
		<Link href={href}>{IconButtonElement}</Link>
	) : (
		IconButtonElement
	);
};

export default CustomIconButton;

const StyledIconButton = styled(IconButton)`
	color: ${({ theme, active }) =>
		active ? theme.color.primary : theme.color.white};
	opacity: ${({ loading }) => (loading ? "0.37" : "1")};
	padding: 7px;
	cursor: ${({ loading }) => (loading ? "not-allowed" : "pointer")};
	transition: all 0.15s ease-in-out;

	.customIconButton__icon {
		font-size: ${({ size }) =>
			size === "small" ? "20px" : size === "medium" ? "24px" : "28px"};
	}

	&:hover {
		background: rgba(255, 255, 255, 0.1);
	}
`;
