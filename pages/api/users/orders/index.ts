import dbConnect from "mongodb/dbConnect";
import { authMiddleware } from "mongodb/middlewares/authMiddleware";
import User from "mongodb/Models/User";

export default authMiddleware(async (req, res) => {
	const {
		method,
		query: { email },
	} = req;
	await dbConnect();

	switch (method) {
		case "GET":
			{
				try {
					const user = await User.findOne({ email });

					if (!user) return res.status(404).send("User not exists");

					res.status(200).json(user.orders);
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
