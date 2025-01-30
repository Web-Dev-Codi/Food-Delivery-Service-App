import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import moment from "moment";


const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "customer"], default: "customer" },
    contact: { type: String, default: "" },
    address: 
      {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String },
      }
    
    //orderHistory: [{ type: Schema.Types.ObjectId, ref: "Order" }], // Ref to Order collection
  },
  { timestamps: true }
);


// Hash password before saving
UserSchema.pre("save", async function (next) {
  const format = "MMMM Do YYYY, h:mm:ss a"; 
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  this.createdAt = moment(this.createdAt).format(format);
  this.updatedAt = moment(this.updatedAt).format(format);
  next();
});


// Method to compare password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const User = model("User", UserSchema);
export default User;
