import dbConnect from "mongodb/dbConnect";
import bcrypt from "bcryptjs";
import User from "mongodb/Models/User";

export default async function handler(req, res) {
	const { method, body } = req;
	await dbConnect();

	switch (method) {
		case "POST":
			{
				try {
					const { username, email, password } = body;
					const existingUser = await User.findOne({ email }).select("email");

					if (existingUser)
						return res
							.status(404)
							.json({ message: "We cannot create account. Try again." });

					await User.create({
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
}
