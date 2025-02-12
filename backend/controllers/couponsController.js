
import Coupon from "../models/couponModel.js";

export const createCoupon = async (req, res) => {
    try{
        const { code, description, discount, validFrom, validUntil, maxUsage, applicableToRestaurants } = req.body;
        if(!code || !description || !discount || !validFrom || !validUntil || !maxUsage || !applicableToRestaurants){
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        const newCoupon = await Coupon.create({ code, description, discount, validFrom, validUntil, maxUsage, applicableToRestaurants });
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

export const getCouponByValidity = async (req, res) => {
    try{
        const currentDate = new Date();
        const validCoupons  = await Coupon.find({ validFrom: { $lte: currentDate }, validUntil: { $gte: currentDate } });
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
        const { code, restaurantId } = req.body;
        const currentDate = new Date();

        // Check if the coupon exists and is within the valid date range
        const validCoupon = await Coupon.findOne({ 
            code, 
            validFrom: { $lte: currentDate }, 
            validUntil: { $gte: currentDate } 
        });

        if (!validCoupon) {
            return res.status(404).json({
                message: "Coupon not found or expired",
            });
        }

        // Check if the coupon is active
        if (!validCoupon.isActive) {
            return res.status(400).json({
                message: "Coupon is not active",
            });
        }

        // Check if the coupon is applicable to the restaurant
        if (
            validCoupon.applicableToRestaurants.length > 0 && 
            !validCoupon.applicableToRestaurants.some(id => id.equals(restaurantId))
        ) {
            return res.status(400).json({
                message: "Coupon not applicable to this restaurant",
            });
        }

        // Check if the usage limit is exceeded
        if (validCoupon.usageCount >= validCoupon.maxUsage) {
            return res.status(400).json({
                message: "Coupon usage limit exceeded",
            });
        }

        // Increment the usage count and save the coupon
        validCoupon.usageCount += 1;
        await validCoupon.save();

        res.status(200).json({ 
            message: "Coupon applied successfully", 
            data: validCoupon
        });
    } catch (error) {
        console.error("Error applying coupon:", error);
        res.status(500).json({ 
            message: "An unexpected error occurred. Please try again later." 
        });
    }
};



    


