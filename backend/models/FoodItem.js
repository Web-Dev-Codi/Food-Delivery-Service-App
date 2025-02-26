import  { Schema,model  } from "mongoose";

const foodItemSchema = new Schema(
	{
		name: { type: String },
		price: { type: Number, min: 1 },
		short_desc: { type: String},
		description: { type: String },
		category: {
			type: String,
			enum: ["Main Course", "Dessert", "Starters", "Beverages"],
		},
		imageUrl: { type: String },
		availability: { type: String, enum: ["Available", "Not Available"] , default: "Available"},
		restaurant: {
			type: Schema.Types.ObjectId,
			ref: "Restaurant",
		},
		ratings: { type: Number, min: 0, max: 5, default: 0 },
	},
	{
		timestamps: true,
	}
);

const FoodItem = model("FoodItem", foodItemSchema);
export default FoodItem;
