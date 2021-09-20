import dbConnect from "mongodb/dbConnect";
import { authMiddleware } from "mongodb/middlewares/authMiddleware";
import User from "mongodb/Models/User";

export default authMiddleware(async (req, res) => {
	const { method, body } = req;
	await dbConnect();

	switch (method) {
		case "PATCH":
			{
				try {
					const { email, favouriteList } = body;

					const user = await User.findOneAndUpdate(
						{ email },
						{
							favouriteList,
						},
						{
							new: true,
						}
					).select("email");

					if (!user)
						return res
							.status(404)
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
