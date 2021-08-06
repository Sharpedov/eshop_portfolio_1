import dbConnect from "mongodb/dbConnect";
import User from "mongodb/Models/User";
import { authenticated } from "pages/api/authenticated";

export default authenticated(async (req, res) => {
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
						return res.status(401).json({
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
