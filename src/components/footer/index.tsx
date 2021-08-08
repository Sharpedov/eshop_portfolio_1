import React from "react";
import styled from "styled-components";
import GitHubIcon from "@material-ui/icons/GitHub";

const FooterItems = {
	Resources: [
		{
			text: "Resources",
			href: "#",
		},
		{
			text: "Advertising",
			href: "#",
		},
		{
			text: "Terms of Use",
			href: "#",
		},
		{
			text: "Privacy",
			href: "#",
		},
		{
			text: "Cookies Policy",
			href: "#",
		},
		{
			text: "Cookies Policy",
			href: "#",
		},
	],

	TORS: [
		{
			text: "Resources",
			href: "#",
		},
		{
			text: "Terms of Use",
			href: "#",
		},
		{
			text: "Privacy",
			href: "#",
		},
		{
			text: "Cookies Policy",
			href: "#",
		},
		{
			text: "Cookies Policy",
			href: "#",
		},
	],

	"Social Medias": [
		{
			text: "Facebook",
			href: "#",
		},
		{
			text: "Twitter",
			href: "#",
		},
		{
			text: "Instagram",
			href: "#",
		},
	],

	"Social Media": [
		{
			text: "Facebook",
			href: "#",
		},
		{
			text: "Twitter",
			href: "#",
		},
		{
			text: "Instagram",
			href: "#",
		},
	],
};

const authorSocials = [
	{
		title: "GitHub",
		icon: GitHubIcon,
		href: "https://github.com/Sharpedov/eshop_portfolio_1",
	},
];

const Footer = () => {
	return (
		<FooterContainer>
			<AuthorSocialsList>
				{authorSocials.map((social, i) => (
					<a
						target="_blank"
						href={social.href}
						rel="noopener noreferrer"
						key={`${social.title}-authorSocial${i}`}
					>
						<AuthorSocial>
							<social.icon className="footerAuthorSocial__icon" />
							<SocialTitle>{social.title}</SocialTitle>
						</AuthorSocial>
					</a>
				))}
			</AuthorSocialsList>
			<Wrapper>
				<Logo>
					eshop<span>.</span>com
				</Logo>
				{Object.entries(FooterItems).map((key) => (
					<Column key={key}>
						<h3>{key[0]}</h3>
						{key[1].map((link, i) => (
							<a key={`${link.href}-${i}`} href={link.href}>
								{link.text}
							</a>
						))}
					</Column>
				))}
			</Wrapper>
		</FooterContainer>
	);
};

const Logo = styled.div`
	color: #fff;
	font-size: 20px;
	border-radius: 2px;
	line-height: 1;

	span {
		color: #fff;
	}
	> span {
		color: ${({ theme }) => theme.color.primary};
	}
`;

const FooterContainer = styled.footer`
	background: ${({ theme }) => theme.surface.footer};
	transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
`;

const AuthorSocialsList = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(70px, 90px));
	grid-gap: 40px 10px;
	align-items: center;
	justify-content: center;
	max-width: 1040px;
	width: 100%;
	margin: 0 auto;
	padding: 40px 24px 20px;
`;

const AuthorSocial = styled.li`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: ${({ theme }) => theme.color.white};
	cursor: pointer;

	.footerAuthorSocial__icon {
		font-size: 28px;
		opacity: 0.9;
	}

	@media (min-width: 768px) {
		.footerAuthorSocial__icon {
			font-size: 30px;
			opacity: 0.75;
			transition: transform 0.3s cubic-bezier(0.33, 1, 0.68, 1),
				opacity 0.3s cubic-bezier(0.33, 1, 0.68, 1);
		}

		&:hover {
			.footerAuthorSocial__icon {
				opacity: 1;
				transform: scale(1.18);
			}
		}
	}
	@media (min-width: 1024px) {
		.footerAuthorSocial__icon {
			font-size: 32px;
		}
	}
	@media (min-width: 1440px) {
		.footerAuthorSocial__icon {
			font-size: 36px;
		}
	}
`;

const SocialTitle = styled.span`
	position: absolute;
	bottom: 0;
	transform: translateY(calc(100% + 7px));
	opacity: 0.9;
	font-size: 13px;

	&:focus {
		opacity: 1;
	}

	@media (min-width: 768px) {
		font-size: 14px;
		transform: translateY(100%) scale(0.85);
		opacity: 0;
		transition: transform 0.3s cubic-bezier(0.33, 1, 0.68, 1),
			opacity 0.3s cubic-bezier(0.33, 1, 0.68, 1);

		${AuthorSocial}:hover & {
			opacity: 1;
			transform: translateY(160%) scale(1);
		}
	}
`;

const Wrapper = styled.div`
	position: relative;
	max-width: 1040px;
	width: 100%;
	margin: 0 auto;
	padding: 40px 24px 80px 24px;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
	grid-gap: 30px 5px;

	@media (min-width: 480px) {
		grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
	}
	@media (min-width: 768px) {
		grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
		padding: 94px 24px 75px 24px;
	}
	@media (min-width: 1024px) {
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
	}
	@media (min-width: 1100px) {
		padding: 94px 0 75px 0;
	}
`;

const Column = styled.div`
	display: flex;
	flex-direction: column;

	> h3 {
		color: ${({ theme }) => theme.color.white};
		font-size: ${({ theme }) => theme.font.xs};
		font-weight: ${({ theme }) => theme.weight.medium};
		margin-bottom: 20px;
	}

	> a {
		color: ${({ theme }) => theme.color.white};
		opacity: 0.65;
		font-size: ${({ theme }) => theme.font.xxs};
		font-weight: ${({ theme }) => theme.weight.regular};
		transition: color 200ms ease-in-out;
		padding: 20px 0;
		outline: none;
		border: none;

		&:hover,
		&:focus {
			opacity: 0.9;
		}
	}
`;

export default Footer;
