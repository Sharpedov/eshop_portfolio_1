import { Avatar } from "@material-ui/core";
import React from "react";
import DefaultLoading from "src/components/loadingIndicators/defaultLoading";
import { fetcher } from "src/utils/swrFetcher";
import styled from "styled-components";
import useSWR from "swr";

interface pageProps {}

const UserComments = ({}: pageProps) => {
	const { data: randomUsersData, error } = useSWR(
		"https://randomuser.me/api/?results=5",
		fetcher
	);

	return (
		<Container>
			{!randomUsersData ? (
				<DefaultLoading marginBottom={40} />
			) : (
				randomUsersData.results.map((user) => {
					const {
						id: { value },
						name: { first, last },
						picture: { medium, thumbnail },
					} = user;
					return (
						<Comment key={value}>
							<CommentLeftSide>
								<UserAvatar
									alt={`User ${first} ${last} avatar`}
									src={thumbnail}
								/>
								<LineDown />
							</CommentLeftSide>
							<CommentRightSide>
								<UserName>{`${first} ${last}`}</UserName>
								<TimeAgo>yesterday</TimeAgo>
								<UserComment>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								</UserComment>
							</CommentRightSide>
						</Comment>
					);
				})
			)}
		</Container>
	);
};

export default UserComments;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	max-width: 1100px;
	width: 100%;
	padding: 16px;
`;

const Comment = styled.div`
	display: flex;
	min-height: 130px;
`;

const CommentLeftSide = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-width: 50px;
`;

const UserAvatar = styled(Avatar)`
	@media ${({ theme }) => theme.breakpoints.md} {
		width: 55px;
		height: 55px;
	}
	@media ${({ theme }) => theme.breakpoints.lg} {
		width: 60px;
		height: 60px;
	}
`;

const LineDown = styled.div`
	margin-top: 8px;
	display: flex;
	flex: 1;
	width: 2px;
	background: #3a3c3f;
`;

const CommentRightSide = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	margin-left: 15px;
`;

const UserName = styled.div`
	color: ${({ theme }) => theme.color.primary};
	font-size: 1.6rem;

	@media ${({ theme }) => theme.breakpoints.md} {
		font-size: 1.7rem;
	}
`;

const TimeAgo = styled.div`
	font-size: 1.2rem;
	line-height: 22px;
	color: rgba(255, 255, 255, 0.5);
	margin-top: 2px;

	@media ${({ theme }) => theme.breakpoints.md} {
		font-size: 1.4rem;
		margin-top: 5px;
	}
`;

const UserComment = styled.div`
	white-space: pre-line;
	font-size: 1.4rem;
	line-height: 26px;
	letter-spacing: 0.5px;
	color: #eee;
	margin: 10px 0;

	@media ${({ theme }) => theme.breakpoints.md} {
		font-size: 1.6rem;
	}
`;
