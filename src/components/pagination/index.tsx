import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";

interface pageProps {
	items;
	perPage?: number;
}

const Pagination = ({ items, perPage }: pageProps) => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [itemsPerPage, setItemsPerPage] = useState<number>(perPage ?? 4);
	const [pages, setPages] = useState([]);
	const [pageIncrementBtn, setPageIncrementBtn] = useState(false);
	const [pageDecrementBtn, setPageDecrementBtn] = useState(false);

	const [pageNumberLimit, setPageNumberLimit] = useState<number>(4);
	const [maxPageNumberLimit, setMaxPageNumberLimit] = useState<number>(4);
	const [minPageNumberLimit, setMinPageNumberLimit] = useState<number>(0);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItemsInPage = items?.slice(indexOfFirstItem, indexOfLastItem);

	useEffect(() => {
		pages.length > maxPageNumberLimit && setPageIncrementBtn(true);
		minPageNumberLimit >= 1 && setPageDecrementBtn(true);

		return () => {
			setPageDecrementBtn(false);
			setPageIncrementBtn(false);
		};
	}, [pages, pageIncrementBtn, maxPageNumberLimit, minPageNumberLimit]);

	useEffect(() => {
		for (let i = 1; i <= Math.ceil(items?.length / itemsPerPage); i++) {
			setPages((prev) => [...prev, i]);
		}
	}, [items, itemsPerPage]);

	const handlePaginationClick = useCallback(
		(e) => {
			setCurrentPage(Number(e.target.id));
		},
		[currentPage, pages]
	);

	const handlePrev = useCallback(() => {
		setCurrentPage((prev) => (prev === 1 ? 1 : prev - 1));

		if ((currentPage - 1) % pageNumberLimit === 0) {
			setMaxPageNumberLimit((prev) => prev - pageNumberLimit);
			setMinPageNumberLimit((prev) => prev - pageNumberLimit);
		}
	}, [
		currentPage,
		pages,
		pageNumberLimit,
		maxPageNumberLimit,
		minPageNumberLimit,
	]);

	const handleNext = useCallback(() => {
		setCurrentPage((prev) => (prev === pages.length ? pages.length : prev + 1));

		if (currentPage + 1 > maxPageNumberLimit) {
			setMaxPageNumberLimit((prev) => prev + pageNumberLimit);
			setMinPageNumberLimit((prev) => prev + pageNumberLimit);
		}
	}, [
		currentPage,
		pages,
		pageNumberLimit,
		maxPageNumberLimit,
		minPageNumberLimit,
	]);

	const renderPagePagination = (
		<Container>
			<StyledButton onClick={handlePrev} disabled={currentPage === 1}>
				Prev Page
			</StyledButton>
			<NumbersList>
				{pageDecrementBtn && <span>...</span>}
				{pages.map((num) => {
					if (num < maxPageNumberLimit + 1 && num > minPageNumberLimit) {
						return (
							<NumberItem
								key={num}
								id={num}
								onClick={handlePaginationClick}
								isactive={currentPage === num}
							>
								{num}
							</NumberItem>
						);
					}
					return null;
				})}
				{pageIncrementBtn && <span>...</span>}
			</NumbersList>

			<StyledButton
				onClick={handleNext}
				disabled={currentPage === pages.length}
			>
				Next Page
			</StyledButton>
		</Container>
	);

	return { currentItemsInPage, renderPagePagination };
};

export default Pagination;

const Container = styled.div`
	display: flex;
	align-items: center;
	margin: 0 auto;
`;

const StyledButton = styled(Button)`
	color: ${({ theme }) => theme.color.primary};
	border: 1px solid ${({ theme }) => theme.color.primary};
	border-radius: 2px;
	font-size: 14px;
	height: 38px;
	padding: 0 15px;

	&:disabled {
		background: hsla(0, 0%, 100%, 0.12);
		border: 1px solid transparent;
		color: hsla(0, 0%, 100%, 0.3);
	}

	&:hover {
		background: rgba(255, 255, 255, 0.05);
	}
`;

const NumbersList = styled.ul`
	display: flex;
	align-items: center;
	gap: 15px;
	padding: 0 20px;

	> span {
		color: ${({ theme }) => theme.color.gray};
	}
`;

const NumberItem = styled.li`
	cursor: pointer;
	color: ${({ isactive, theme }) =>
		isactive ? theme.color.white : theme.color.gray};
	outline: none;
`;
