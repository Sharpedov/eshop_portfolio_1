import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		price: { type: Number, required: true },
		brand: { type: String, required: true },
		category: { type: String, required: true },
		gender: { type: String, enum: ["men", "women"], required: true },
		description: { type: String, required: true },
		images: { type: [String] },
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.Product ||
	mongoose.model("Product", ProductSchema);
