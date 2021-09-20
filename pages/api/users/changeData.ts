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
					const { email, username } = body;
					const updatedUser = await User.findOneAndUpdate(
						{ email },
						{ username },
						{ new: true }
					);

					if (!updatedUser) {
						return res.status(404).json({
							message: "Invalid user",
						});
					}

					res
						.status(200)
						.json({ message: "User data has been successfully changed" });
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
