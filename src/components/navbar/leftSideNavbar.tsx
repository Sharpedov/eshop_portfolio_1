import React from "react";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import CustomIconButton from "../customIconButton";
import { ButtonBase } from "@material-ui/core";
import Link from "next/link";

interface pageProps {
	toggleDrawler: () => void;
}

const LeftSideNavbar = ({ toggleDrawler }: pageProps) => {
	return (
		<>
			<LeftSide>
				<CustomIconButton
					onClick={() => toggleDrawler()}
					Icon={MenuIcon}
					size="medium"
					ariaLabel="Drawler menu"
				/>
				<Link href="/" passHref>
					<Logo>
						eshop<span>.</span>com
					</Logo>
				</Link>
			</LeftSide>
		</>
	);
};

export default LeftSideNavbar;

const LeftSide = styled.div`
	display: flex;
	align-items: center;

	@media (min-width: 480px) {
		flex: 0.35;
	}
`;

const Logo = styled(ButtonBase)`
	&&& {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 1.7rem;
		padding: 0 8px;
		margin: 0 8px 0 16px;
		height: 45px;
		border-radius: 2px;
		line-height: 1;

		span {
			color: #fff;
		}
		> span {
			color: ${({ theme }) => theme.color.primary};
		}
	}

	@media ${({ theme }) => theme.breakpoints.md} {
		&&& {
			padding: 0 12px;
		}
	}
	@media ${({ theme }) => theme.breakpoints.lg} {
		&&& {
			padding: 0 15px;
		}
	}
`;
