import dbConnect from "mongodb/dbConnect";
import User from "mongodb/Models/User";
import { authenticated } from "pages/api/authenticated";

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "1.5mb",
		},
	},
};

export default authenticated(async (req, res) => {
	const {
		method,
		body: { email, avatar },
	} = req;
	await dbConnect();

	switch (method) {
		case "PATCH":
			{
				try {
					const updatedAvatar = await User.findOneAndUpdate(
						{ email },
						{ avatar },
						{
							new: true,
						}
					);

					if (!updatedAvatar)
						return res
							.status(404)
							.send({ message: "You need to provide the avatar" });

					res
						.status(200)
						.json({ message: "Avatar has been successfully changed" });
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
