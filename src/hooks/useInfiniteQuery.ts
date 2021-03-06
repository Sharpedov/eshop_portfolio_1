import { fetcher } from "src/utils/swrFetcher";
import { useSWRInfinite } from "swr";

interface IProps {
	queryKey;
}

export const useInfiniteQuery = ({ queryKey }: IProps) => {
	const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
		(index) => `${queryKey}&page=${index + 1}`,
		fetcher
	);

	const fetchNextPage = () => setSize((size) => size + 1);
	const fetchedData = data ? [].concat(...data) : [];
	const isLoadingInitialData = !data && !error;
	const isLoadingMore =
		isLoadingInitialData ||
		(size > 0 && data && typeof data[size - 1] === "undefined");
	const isEmpty = data?.[0]?.length === 0;
	const hasNextPage = isEmpty || (data && data[data.length - 1]?.length < 3);
	const isRefreshing = isValidating && data && data.length === size;

	return {
		fetchNextPage,
		fetchedData,
		size,
		error,
		isLoadingInitialData,
		isLoadingMore,
		isEmpty,
		hasNextPage,
		isRefreshing,
	};
};
