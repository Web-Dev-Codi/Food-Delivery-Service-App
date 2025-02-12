import { Schema, model } from "mongoose";

const MenuItemSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 1 },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["Main Course", "Dessert", "Starters", "Beverages"],
      required: true,
    },
    imageUrl: { type: String, required: true },
    availability: { type: Boolean, default: true },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model("MenuItem", MenuItemSchema);
