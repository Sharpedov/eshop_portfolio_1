import dbConnect from "mongodb/dbConnect";
import User from "mongodb/Models/User";
import bcrypt from "bcryptjs";

export default async (req, res) => {
	const { method, body } = req;
	await dbConnect();

	switch (method) {
		case "POST":
			{
				try {
					const { username, email, password } = body;

					const existingUser = await User.findOne({ email });
					if (existingUser)
						return res.status(401).json({
							message: "We cannot create account. Try again.",
						});

					const user = await User.create({
						username,
						email,
						password: await bcrypt.hashSync(password, 12),
					});

					res.status(201).json({ success: true });
				} catch (error) {
					res.status(400).json({ success: false, message: error });
				}
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};
