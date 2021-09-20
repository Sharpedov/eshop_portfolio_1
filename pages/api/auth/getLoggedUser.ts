import dbConnect from "mongodb/dbConnect";
import { authMiddleware } from "mongodb/middlewares/authMiddleware";
import User from "mongodb/Models/User";

export default authMiddleware(async function handler(req, res) {
	await dbConnect();
	const user = await User.findOne({ _id: req.token.userId });
	res.json(user);
});
