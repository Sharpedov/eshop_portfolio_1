import dbConnect from "mongodb/dbConnect";
import User from "mongodb/Models/User";
import { compare } from "bcryptjs";
import { authMiddleware } from "mongodb/middlewares/authMiddleware";

export default authMiddleware(async (req, res) => {
	const { method, body } = req;
	await dbConnect();

	switch (method) {
		case "PATCH":
			{
				try {
					const { email, newEmail, password } = body;
					const user = await User.findOne({ email }).select("+password");
					const existingEmail = await User.findOne({ email: newEmail });

					if (!user || existingEmail)
						return res.status(404).json({
							message: "Invalid email",
						});

					const isMatch = await compare(password, user.password);

					if (!isMatch)
						return res.status(404).json({
							message: "Invalid password",
						});

					const updatedEmail = await User.findOneAndUpdate(
						{ email },
						{ email: newEmail },
						{
							new: true,
						}
					);

					res
						.status(200)
						.json({ message: "Email has been successfully changed" });
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
