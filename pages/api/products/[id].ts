import dbConnect from "mongodb/dbConnect";
import Product from "mongodb/Models/Product";

export default async function handler(req, res) {
	const {
		method,
		query: { id },
	} = req;

	await dbConnect();

	switch (method) {
		case "GET":
			{
				try {
					const product = await Product.findById(id);

					if (!product)
						return res
							.status(400)
							.json({ success: false, message: "Product not found" });

					res.status(200).json({ success: false, data: product });
				} catch (error) {
					res.status(404).json({ success: false, message: error });
				}
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
