import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import OrderCard from "./orderCard";
import Skeleton from "@material-ui/lab/Skeleton";
import Pagination from "src/components/pagination";
import DefaultLoading from "src/components/loadingIndicators/defaultLoading";
import useSWR from "swr";
import { fetcher } from "src/utils/swrFetcher";
import EmptyPageHeader from "src/components/emptyPageHeader";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import { useAuth } from "src/components/authProvider";
import OrderDetails from "./orderDetails";

interface pageProps {}

const AccountOrdersContent = ({}: pageProps) => {
	const { user, loading } = useAuth();
	const { data: orders, error } = useSWR(
		user && `/api/users/orders?email=${user.email}`,
		fetcher
	);
	const { currentItemsInPage, renderPagePagination } = Pagination({
		items: orders,
		perPage: 3,
	});
	const [orderDetails, setOrderDetails] = useState(null);

	if (orderDetails)
		return (
			<OrderDetails
				orderDetails={orderDetails}
				setOrderDetails={setOrderDetails}
			/>
		);

	return (
		<>
			<Body id="accountOrdersBody">
				{!orders ? (
					<DefaultLoading marginTop={90} marginBottom={60} />
				) : orders.length === 0 ? (
					<div style={{ margin: "auto" }}>
						<EmptyPageHeader
							title="Orders history is empty"
							Icon={LocalMallIcon}
						/>
					</div>
				) : (
					<Orders>
						{currentItemsInPage.map((order, i) => (
							<OrderCard
								key={`order-${order.createdAt}-${i}`}
								orderData={order}
								setOrderDetails={setOrderDetails}
							/>
						))}
					</Orders>
				)}
				{orders?.length >= 1 && renderPagePagination}
			</Body>
		</>
	);
};

export default AccountOrdersContent;

const appear = keyframes`
	from {
		opacity:0;
	}
	to{
		opacity:1;
	}
`;

const skeletonEnter = keyframes`
	from {
		opacity:0;
		transform: scale(.92);
	}
	to{
		opacity:1;
		transform: none;
	}
`;

// const Heading = styled.div`
// 	border-radius: 2px;
// 	padding: 15px 0;

// 	> h1 {
// 		color: ${({ theme }) => theme.color.white};
// 		font-size: ${({ theme }) => theme.font.xs};
// 	}

// 	@media (min-width: 1024px) {
// 		> h1 {
// 			font-size: ${({ theme }) => `calc(${theme.font.s})`};
// 		}
// 	}
// `;

const Body = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-radius: 2px;
	min-height: 60vh;
	margin-top: 15px;
	gap: 15px;
`;

const Orders = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
	animation: ${appear} 0.3s ease-in-out;
`;

const SkeletonWrapper = styled.div`
	display: grid;
	grid-template-columns: 2fr 3fr;
	height: 110px;
	grid-gap: 10px;

	animation: ${skeletonEnter} 0.3s linear;

	@media (min-width: 576px) {
		grid-template-columns: minmax(125px, 250px) 1fr;
	}
`;

const SkeletonLeft = styled.div``;

const SkeletonRight = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 10px;
`;

const StyledSkeleton = styled(Skeleton)`
	background: rgba(0, 0, 0, 0.2);
	border-radius: 2px;
`;
