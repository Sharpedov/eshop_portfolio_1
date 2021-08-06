import dbConnect from "mongodb/dbConnect";
import User from "mongodb/Models/User";
import { authenticated } from "../authenticated";

export default authenticated(async (req, res) => {
	const { method, body, query } = req;
	await dbConnect();

	switch (method) {
		case "PATCH":
			{
				try {
					const { email, shoppingCart } = body;

					const user = await User.findOneAndUpdate(
						{ email },
						{
							shoppingCart,
						},
						{
							new: true,
						}
					).select("email");

					if (!user)
						return res
							.status(401)
							.json({ success: false, message: "Something went wrong" });

					res.status(200).json({ success: true });
				} catch (error) {
					res.status(400).json({ success: false, message: error });
				}
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
});
