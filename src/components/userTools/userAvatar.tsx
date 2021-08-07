import React from "react";
import { Avatar, ButtonBase } from "@material-ui/core";
import styled, { keyframes } from "styled-components";
import Skeleton from "@material-ui/lab/Skeleton";

interface pageProps {
	src: string;
	loading?: boolean;
	width?: number;
	onClick?: () => void;
}

const UserAvatar = ({ src, loading, width, onClick }: pageProps) => {
	return loading ? (
		<UserAvatarSkeleton width={width} variant="circle" animation="wave" />
	) : (
		<UserAvatarWrapper aria-label="User dropdown navigation" onClick={onClick}>
			<StyledAvatar alt="User avatar" width={width} src={src} />
		</UserAvatarWrapper>
	);
};

export default UserAvatar;

const UserAvatarAppear = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const UserAvatarSkeleton = styled(Skeleton)`
	height: ${({ width }) => (width ? `${width}px` : "40px")};
	width: ${({ width }) => (width ? `${width}px` : "40px")};
	transform: scale(0.95);
	background: rgba(255, 255, 255, 0.061);

	@media (min-width: 768px) {
		transform: scale(1);
	}
`;

const UserAvatarWrapper = styled(ButtonBase)`
	border-radius: 50%;

	> span {
		color: #000;
	}
`;

const StyledAvatar = styled(Avatar)`
	height: ${({ width }) => (width ? `${width}px` : "40px")};
	width: ${({ width }) => (width ? `${width}px` : "40px")};
	transform: scale(0.95);
	animation: ${UserAvatarAppear} 0.3s cubic-bezier(0.37, 0, 0.63, 1);

	@media (min-width: 768px) {
		transform: scale(1);
	}
`;
