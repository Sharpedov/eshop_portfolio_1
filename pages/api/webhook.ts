import { buffer } from "micro";
import moment from "moment";
import dbConnect from "mongodb/dbConnect";
import Product from "mongodb/Models/Product";
import User from "mongodb/Models/User";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
	await dbConnect();
	const products = await Product.find().select(
		"_id title price gender category brand images"
	);

	const items = JSON.parse(session.metadata.itemsId).map(
		(id) => products.filter((product) => product._id.toString() === id)[0]
	);

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

		switch (event.type) {
			case "checkout.session.completed":
				const session = event.data.object;

				try {
					event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);

					fulfillOrder(session)
						.then(() => res.status(200))
						.catch((err) =>
							res.status(400).send(`Webhook Error: ${err.message}`)
						);
				} catch (err) {
					console.log("ERROR", err.message);
					return res.status(400).send(`Webhook Error: ${err.message}`);
				}

				break;
			default:
				console.log(`Unhandled event type ${event.type}`);
		}
		res.json({ received: true });
	}
}

export const config = {
	api: {
		bodyParser: false,
		externalResolver: true,
	},
};
