import User from "mongodb/Models/User";
import {
	refreshAuthTokens,
	setAuthTokens,
	verifyRefreshToken,
} from "mongodb/utils/authTokenUtils";

export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case "POST": {
			try {
				const currentToken = verifyRefreshToken(req.cookies.auth_refresh);
				const user = await User.findById(currentToken.userId);

				if (!user) return res.stauts(404).json({ message: "User not found" });

				const { accessToken, refreshToken } = refreshAuthTokens(currentToken);
				setAuthTokens(res, accessToken, refreshToken);

				res.status(200).json({ success: true });
			} catch (error) {
				res.status(400).json({ success: false, message: error });
			}
			break;
		}
		default:
			res.status(400).json({ success: false });
			break;
	}
}
