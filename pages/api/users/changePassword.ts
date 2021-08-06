import dbConnect from "mongodb/dbConnect";
import User from "mongodb/Models/User";
import { compare } from "bcryptjs";
import bcrypt from "bcryptjs";
import { authenticated } from "pages/api/authenticated";

export default authenticated(async (req, res) => {
	const { method, body } = req;
	await dbConnect();

	if (req.method === "PATCH") {
		try {
			const { email, password, newPassword } = body;
			const user = await User.findOne({ email }).select("+password");

			if (!user)
				return res.status(401).json({
					message: "Invalid password",
				});

			const isMatch = await compare(password, user.password);

			if (!isMatch)
				return res.status(401).json({
					message: "Invalid password",
				});

			const updatedPassword = await User.findOneAndUpdate(
				{ email },
				{ password: await bcrypt.hashSync(newPassword, 12) },
				{
					new: true,
				}
			);
			res
				.status(200)
				.json({ message: "Password has been successfully changed" });
		} catch (error) {
			res.status(400).json({ success: false, message: error });
		}
	} else {
		res.status(400).json({ success: false });
	}
});
