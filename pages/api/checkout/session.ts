import { authMiddleware } from "mongodb/middlewares/authMiddleware";
import { formatAmountForStripe } from "src/utils/stripeHelpers";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default authMiddleware(async (req, res) => {
	const { items, email } = req.body;

	if (req.method === "POST") {
		const session = await stripe.checkout.sessions.create({
			success_url: `${process.env.HOST}`,
			cancel_url: `${process.env.HOST}`,
			shipping_rates: ["shr_1IyiZUDo3BXslR9dpAL6M4MX"],
			shipping_address_collection: {
				allowed_countries: ["PL"],
			},
			// price: "price_1IyiM9Do3BXslR9dY0u1fhgg",
			payment_method_types: ["card"],
			line_items: items.map((item) => ({
				price_data: {
					currency: "usd",
					product_data: {
						name: item.title,
						images: [item.images[0]],
					},
					unit_amount: formatAmountForStripe(item.price, "usd"),
				},
				quantity: item.qty,
			})),
			mode: "payment",
			metadata: {
				email,
				itemsId: JSON.stringify(items.map((item) => item._id)),
			},
		});

		res.status(200).json({
			id: session.id,
		});
	}
});
