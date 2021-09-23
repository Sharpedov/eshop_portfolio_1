import React, { useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import OrderCard from "./orderCard";
import Pagination from "src/components/pagination";
import DefaultLoading from "src/components/loadingIndicators/defaultLoading";
import useSWR from "swr";
import { fetcher } from "src/utils/swrFetcher";
import EmptyPageHeader from "src/components/emptyPageHeader";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import { useUser } from "src/components/userProvider";
import OrderDetails from "./orderDetails";
import { Pagination as MaterialPagination } from "@material-ui/lab";
import { scroller } from "react-scroll";

interface pageProps {}

const AccountOrdersContent = ({}: pageProps) => {
	const { user, isLogged } = useUser();
	const { data: orders, error } = useSWR(
		isLogged && `/api/users/orders?email=${user.email}`,
		fetcher
	);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [selectedPage, setSelectedPage] = useState<number>(1);
	const sortByNewestOrder = useMemo(() => {
		if (orders) {
			return orders.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			);
		}
	}, [orders]);
	const { currentItemsInPage, pagesCount } = Pagination({
		items: sortByNewestOrder,
		selectedPage,
		perPage: 3,
	});

	const selectedPageHandler = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setSelectedPage(value);
		scroller.scrollTo("accountOrdersBody", {
			duration: 350,
			delay: 50,
			spy: true,
			smooth: true,
			offset: -140,
		});
	};

	if (selectedOrder)
		return (
			<OrderDetails
				selectedOrder={selectedOrder}
				onClose={() => setSelectedOrder(null)}
			/>
		);

	return (
		<>
			<Body id="accountOrdersBody">
				{error ? (
					<div>{error.message}</div>
				) : !orders ? (
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
								setSelectedOrder={setSelectedOrder}
							/>
						))}
					</Orders>
				)}
				{pagesCount >= 2 && (
					<StyledMaterialPagination
						count={pagesCount}
						page={selectedPage}
						onChange={selectedPageHandler}
					/>
				)}
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

const Body = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: space-between;
	border-radius: 2px;
	min-height: 30vh;
	margin-top: 15px;
	gap: 15px;
`;

const Orders = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
	animation: ${appear} 0.3s ease-in-out;
`;

const StyledMaterialPagination = styled(MaterialPagination)`
	.MuiPaginationItem-root {
		color: ${({ theme }) => theme.color.white};
		font-size: 1.6rem;

		&:hover {
			background: rgba(255, 255, 255, 0.05);
		}
	}
	.Mui-selected {
		background: rgba(255, 255, 255, 0.1);
	}
	.MuiSvgIcon-root {
		font-size: 2.2rem;
	}
	margin: 0 auto;
`;
