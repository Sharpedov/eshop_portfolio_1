import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, require: true, minLength: 4, select: false },
		avatar: { type: String },
		orders: { type: [] },
		shoppingCart: { type: [] },
		favouriteList: { type: [] },
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
