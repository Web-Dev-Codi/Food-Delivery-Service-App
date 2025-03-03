
import Coupon from "../models/couponSchema.js";
import Cart from "../models/cartSchema.js";

export const createCoupon = async (req, res) => {
    try{
     
        const newCoupon = await Coupon.create(req.body);
        if(!newCoupon){
            return res.status(400).json({
                message: "Coupon creation failed",
            });
        }
        res.status(201).json({ message: "Coupon created successfully", data: newCoupon });

    }
    catch(error){
        console.error("Error creating coupon:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getAllCoupons = async (req, res) => {
    try{

        
        const coupons = await Coupon.find({isActive:true}).populate("applicableToRestaurants");
        if(!coupons || coupons.length === 0){
            return res.status(404).json({
                message: "No coupons found",
            });
        }
        res.status(200).json({ message: "Coupons found", data: coupons });
    }
    catch(error){
        console.error("Error getting coupons:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getCouponByValidity = async (req, res) => {
    try{
        const currentDate = new Date();
        const validCoupons  = await Coupon.find({ validFrom: { $lte: currentDate }, validUntil: { $gte: currentDate } }).populate("applicableToRestaurants");
        if(!validCoupons){
            return res.status(404).json({
                message: "No coupons found",
            });
        }
        res.status(200).json({ message: "Valid coupons found", data: validCoupons });
    }
    catch(error){
        console.error("Error getting valid coupons:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getCouponById = async (req, res) => {
    try{
        const { id } = req.params;
     
        const coupon = await Coupon.findById(id);
        if(!coupon){
            return res.status(404).json({
                message: "Coupon not found",
            });
        }
        res.status(200).json({ message: "Coupon found", data: coupon });
    }
    catch(error){
        console.error("Error getting coupon:", error);
        res.status(500).json({ message: error.message });
    }
};

export const updateCoupon = async (req, res) => {
    const { id } = req.params;
    try{
        const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true });
        if(!updatedCoupon){
            return res.status(404).json({
                message: "Coupon not found",
            });
        }
        res.status(200).json({ message: "Coupon updated successfully", data: updatedCoupon });
    }
    catch(error){
        console.error("Error updating coupon:", error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteCoupon = async (req, res) => {
    try{
        const { id } = req.params;
        const deletedCoupon = await Coupon.findByIdAndDelete(id);
        if(!deletedCoupon){
            return res.status(404).json({
                message: "Coupon not found",
            });
        }
        res.status(200).json({ message: "Coupon deleted successfully", data: deletedCoupon });
    }
     catch(error){
        console.error("Error deleting coupon:", error);
        res.status(500).json({ message: error.message });
     }
};

export const applyCoupon = async (req, res) => {
    try {
        const { code } = req.body;
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User ID missing from token" });
        }

        // Fetch user's cart and populate food items
        const cart = await Cart.findOne({ userId }).populate({
            path: "items.foodItemId",
            select: "restaurant name price",
            populate: { path: "restaurant", select: "_id" } // ✅ Ensures `restaurantId` is populated
        });
        if (!cart || cart.items.length === 0) {
            return res.status(404).json({ message: "Cart is empty or not found." });
        }
        console.log("Cart Items:", cart.items.map(item => item.foodItemId));

        // Extract all unique restaurant IDs from cart items
        const restaurantIdsInCart = [...new Set(
            cart.items
                .map(item => item.foodItemId.restaurant?._id?.toString()) // 
                .filter(id => id) 
        )];
        

        // Handle coupon removal
        if (!code) {
            if (!cart.appliedCoupon) {
                return res.status(400).json({ message: "No coupon applied to remove." });
            }
            cart.discount = 0;
            cart.finalAmount = cart.totalAmount;
            cart.appliedCoupon = null;
            await cart.save();

            return res.status(200).json({ 
                message: "Coupon removed successfully", 
                finalAmount: cart.finalAmount,
                cart
            });
        }

        // Find a valid coupon
        const validCoupon = await Coupon.findOne({
            code,
            validFrom: { $lte: new Date() },
            validUntil: { $gte: new Date() },
            isActive: true
        });
        console.log("valid coupon", validCoupon);

        if (!validCoupon) {
            console.log("wrong coupon hello")
            return res.status(404).json({ message: "Coupon not found or expired." });

        }

        //to check if the coupon is already used by the user
         if(validCoupon.usedBy.includes(userId)){
            return res.status(400).json({ message: "Sorry! Coupon already used by the you." });
        }


   // ✅ Find common restaurant(s) between cart and coupon
        const applicableRestaurants = validCoupon.applicableToRestaurants.map(id => id.toString());
        const matchedRestaurants = restaurantIdsInCart.map(id => id.toString()).filter(id => applicableRestaurants.includes(id));
        console.log("Applicable Restaurants:", applicableRestaurants);
console.log("Cart Restaurants:", restaurantIdsInCart);
console.log("Matched Restaurants:", matchedRestaurants);


        if (matchedRestaurants.length === 0) {
            return res.status(400).json({ message: "Coupon is not applicable to any restaurant in your cart." });
        }

        // ✅ Apply discount **only** to matched restaurant items
        let discount = 0;
        let eligibleTotal = 0;

        cart.items.forEach(item => {
            if (matchedRestaurants.includes(item.foodItemId.restaurant?._id?.toString())) {
                const itemTotal = item.foodItemId.price * item.quantity;
                eligibleTotal += itemTotal;
            }
        });

        if (eligibleTotal > 0) {
            discount = parseFloat((eligibleTotal * (validCoupon.discount / 100)).toFixed(2));
        }

        let finalAmount = Math.max(cart.totalAmount - discount, 0);

        // Update cart
        cart.discount = discount;
        cart.finalAmount = finalAmount;
        cart.appliedCoupon = validCoupon._id;
        await cart.save();

         // ✅ Add user to `usedBy` array to track usage
         validCoupon.usedBy.push(userId);
         await validCoupon.save();
 
         res.status(200).json({ 
             message: "Coupon applied successfully!", 
             discount,
             finalAmount,
             cart
         });
 
     }  catch (error) {
        console.error("Error applying coupon:", error);
        res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
    }
};
