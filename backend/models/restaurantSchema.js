import { Schema, model } from "mongoose";
import moment from "moment";

const RestaurantSchema = new Schema(
	{
		name: { type: String, required: true },
		location: { type: String }, // Optional for details like city or street
		images: [{ type: String }], // Array to store image URLs
		contact: { type: String },
		operatingHours: {
			monday: { type: String },
			tuesday: { type: String },
			wednesday: { type: String },
			thursday: { type: String },
			friday: { type: String },
			saturday: { type: String },
			sunday: { type: String },
		},
	},
	{ timestamps: true } // Automatically manages createdAt and updatedAt
);

RestaurantSchema.pre("save", function (next) {
	const format = "MMMM Do YYYY, h:mm:ss a";
	this.createdAt = moment(this.createdAt).format(format);
	this.updatedAt = moment(this.updatedAt).format(format);
	next();
});

const Restaurant = model("Restaurant", RestaurantSchema);
export default Restaurant;
