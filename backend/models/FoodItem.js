import { Schema, model } from "mongoose";

const foodItemSchema = new Schema(
	{
		name: { type: String },
		price: { type: Number, min: 1 },
		description: { type: String },
		category: {
			type: String,
			enum: ["Main Course", "Dessert", "Starters", "Beverages"],
			required: true,
		},
		imageUrl: { type: String },
		availability: { type: String, enum: ["Available", "Not Available"] },
		restaurant: {
			type: Schema.Types.ObjectId,
			ref: "Restaurant",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default model("FoodItem", foodItemSchema);