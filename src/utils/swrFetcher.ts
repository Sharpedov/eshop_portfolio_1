import axios from "axios";

export const fetcher = (url) => {
	return axios.get(url).then((res) => res.data);
};
