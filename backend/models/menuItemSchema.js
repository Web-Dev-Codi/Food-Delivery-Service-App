import { Schema, model } from "mongoose";

const MenuItemSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },  // URL to the image
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    category: { type: String },
    isAvailable: { type: Boolean, default: true },
    preparationTime: { type: Number },  // in minutes
    allergens: [{ type: String }],
    nutritionalInfo: {
      calories: { type: Number },
      protein: { type: Number },
      carbs: { type: Number },
      fats: { type: Number }
    }
  },
  { timestamps: true }
);

export default model("MenuItem", MenuItemSchema);
