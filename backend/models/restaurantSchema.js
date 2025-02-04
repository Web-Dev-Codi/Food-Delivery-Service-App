import { Schema, model } from "mongoose";
import moment from "moment";

const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

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
    reviews: [ReviewSchema], // Embed reviews here
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    }
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt
);

RestaurantSchema.pre("save", function (next) {
	const format = "MMMM Do YYYY, h:mm:ss a";
	this.createdAt = moment(this.createdAt).format(format);
	this.updatedAt = moment(this.updatedAt).format(format);
	next();
});

RestaurantSchema.methods.calculateAverageRating = function () {
  if (this.reviews.length === 0) {
    this.averageRating = 0;
  } else {
    const totalRating = this.reviews.reduce(
      (sum, review) => sum + review.rating,
      0,
    );
    this.averageRating = (totalRating / this.reviews.length).toFixed(1);
  }
};

const Restaurant = model("Restaurant", RestaurantSchema);
export default Restaurant;
