import axios from "axios";

export const uploadFile = async (
	file: File,
	setProgress?: (percentage: number) => void
) => {
	const formData = new FormData();
	const url = "https://api.cloudinary.com/v1_1/demo/image/upload";
	const key = "docs_upload_example_us_preset";
	formData.append("file", file);
	formData.append("upload_preset", key);
	try {
		const { data } = await axios.post(url, formData, {
			onUploadProgress: (progressEvent) => {
				let percentCompleted = Math.round(
					(progressEvent.loaded * 100) / progressEvent.total
				);
				setProgress(percentCompleted);
			},
			headers: {
				"Content-Type": "text/plain",
				"X-Requested-With": "XMLHttpRequest",
			},
		});
		return [data.secure_url, null];
	} catch (err) {
		return [null, err.message];
	}
};
