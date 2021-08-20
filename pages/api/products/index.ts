import dbConnect from "mongodb/dbConnect";
import Product from "mongodb/Models/Product";

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "25mb",
		},
	},
};

export default async function handler(req, res) {
	const {
		method,
		body,
		query: { gender, sort, brand, category, minPrice, maxPrice },
	} = req;
	await dbConnect();

	switch (method) {
		case "GET":
			{
				try {
					const page = parseInt(req.query.page);
					const limit = parseInt(req.query.limit);

					const startIndex = (Number(page) - 1) * Number(limit);

					const regex = (arr) =>
						arr.split(",").map((el) => new RegExp(el, "i"));

					const products = await Product.find({
						gender: gender,
						brand: regex(brand),
						category: regex(category),
						price: { $gte: minPrice, $lte: maxPrice },
					})
						.sort(sort)
						.limit(limit)
						.skip(startIndex);
					res.status(200).json(products);
				} catch (error) {
					res.status(400).json({ success: false, message: error.message });
				}
			}
			break;

		case "POST":
			{
				try {
					const product = await Product.create(body);

					res.status(201).json(product);
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
