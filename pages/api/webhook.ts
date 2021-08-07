import { buffer } from "micro";
import moment from "moment";
import dbConnect from "mongodb/dbConnect";
import Product from "mongodb/Models/Product";
import User from "mongodb/Models/User";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session, items) => {
	await dbConnect();

	return await User.findOneAndUpdate(
		{ email: session.metadata.email },
		{
			$push: {
				orders: {
					amount: session.amount_total / 100,
					amount_shipping: session.total_details.amount_shipping / 100,
					items,
					createdAt: moment().format(),
				},
			},
			shoppingCart: [],
		},
		{
			new: true,
		}
	);
};

export default async function handler(req, res) {
	if (req.method === "POST") {
		await dbConnect();
		const products = await Product.find();
		const requestBuffer = await buffer(req);
		const payload = requestBuffer.toString();
		const sig = req.headers["stripe-signature"];

		let event;

		try {
			event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
		} catch (err) {
			console.log("ERROR", err.message);
			return res.status(400).send(`Webhook Error: ${err.message}`);
		}

		if (event.type === "checkout.session.completed") {
			const session = event.data.object;

			const productsProperties = products.map((product) => ({
				_id: product._id,
				title: product.title,
				price: product.price,
				gender: product.gender,
				category: product.category,
				brand: product.brand,
				images: [product.images[0]],
			}));

			const items = JSON.parse(session.metadata.itemsId).map(
				(id) =>
					productsProperties.filter(
						(product) => product._id.toString() === id
					)[0]
			);

			return fulfillOrder(session, items)
				.then(() => res.status(200))
				.catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
		}
	}
}

export const config = {
	api: {
		bodyParser: false,
		externalResolver: true,
	},
};
