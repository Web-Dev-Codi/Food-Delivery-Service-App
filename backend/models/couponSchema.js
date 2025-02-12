import { Schema , model } from 'mongoose';


    const CouponSchema = new Schema(
        {
          code: { type: String, required: true, unique: true },
          description: { type: String, required: true,
          validate: {
            validator: function (v) {
              return v > 0;
            },
            message: "Discount must be greater than 0",
           }
          },
          discount: { type: Number, required: true }, // Discount in percentage or fixed amount
          validFrom: { type: Date, required: true }, // Required to define start date
          validUntil: { type: Date, required: true }, // Required to define expiry
          maxUsage: { type: Number, default: 1 }, // Default at least 1 use
          usageCount: { type: Number, default: 0 }, // Tracks the times used
          applicableToRestaurants: [{ type: Schema.Types.ObjectId, ref: "Restaurant" }], // Linked to Restaurants
          isActive: { type: Boolean, default: true }, // Easy filter for active coupons
        },
        { timestamps: true } // Automatically manages createdAt and updatedAt
        )
   

      
      const Coupon = model("Coupon", CouponSchema);
      export default Coupon;