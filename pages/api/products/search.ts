import dbConnect from "mongodb/dbConnect";
import Product from "mongodb/Models/Product";

export default async function handler(req, res) {
	const {
		method,
		query: { term },
	} = req;
	await dbConnect();

	switch (method) {
		case "GET":
			{
				try {
					const products = await Product.aggregate([
						{
							$search: {
								search: {
									query: term,
									path: ["title", "gender", "category", "brand"],
								},
							},
						},
					]);

					res.status(200).json(products);
				} catch (error) {
					res.status(400).json({ success: false, message: error });
				}
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
