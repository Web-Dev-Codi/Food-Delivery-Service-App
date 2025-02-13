import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import moment from "moment";
import crypto from "crypto";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },
    contact: { type: String, default: "" },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
    },
    cartItems: [
      {
        foodItem: {
          type: Schema.Types.ObjectId,
          ref: "FoodItem",
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    // cartId: {
    //   type: String,
    //   unique: true,
    //   sparse: true,
    // },
    // guestCartId: {
    //   type: String,
    //   unique: true,
    //   sparse: true,
    // },
  },
  { timestamps: true },

);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  const format = "MMMM Do YYYY, h:mm:ss a";
  if (!this.isModified("password")) {
    console.log(this.password);
      next();
    }
    console.log("hello");
  this.password = await bcrypt.hash(this.password, 10);
  console.log(this.password);
  this.createdAt = moment(this.createdAt).format(format);
  this.updatedAt = moment(this.updatedAt).format(format);
  next();
});

// Method to compare password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  console.log(enteredPassword);
  console.log(this.password);
  console.log(await bcrypt.compare(enteredPassword, this.password));
  return await bcrypt.compare(enteredPassword, this.password);


};

 // Method to generate a reset password token
UserSchema.methods.generateResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetPasswordToken = resetToken;
  this.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
  return resetToken;
};

const User = model("User", UserSchema);
export default User;
