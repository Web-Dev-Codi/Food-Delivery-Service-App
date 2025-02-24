import Order from '../models/orderSchema.js';
import Cart from '../models/cartSchema.js';
import User from '../models/userSchema.js';
import Payment from '../models/paymentSchema.js';



export const createOrder = async (req, res) => {
    try{
        const userId = req.userId;
        const {cartId,paymentId} = req.body;
       const user = await User.findById(userId).select("address contact email name ");
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        // Check if cart exists and is processed
         const cart = await Cart.findOne({_id: cartId,userId, status: "Processed"}).populate("items.foodItemId");
            if(!cart){
                return res.status(400).json({message: "Cart not found"});
            }

        // Check if payment exists and is successful
        const payment = await Payment.findOne({_id: paymentId, userId, status: "Succeeded"});
        if(!payment){
            return res.status(400).json({message: "Payment not found"});
        }

        // Create order
        const order = new Order({
            userId,
            cartId,
            totalAmount: cart.finalAmount,
            paymentId,
            isPaid: payment.status === "Succeeded",

        });

        await order.save();
       
       
        res.status(201).json({message: "Order created successfully", order});
    }catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
    }

 }

 export const getOrders = async (req, res) => {
    try{
        
        const orders = await Order.find().populate({
            path: "cartId",
            populate: { path: "items.foodItemId", select: "name price quantity" } 
        })
        .populate("userId", "name email address contact") // Populate User details
        .populate("paymentId", "amount status") // Populate Payment details
        .select("-__v"); // Exclude unnecessary fields
        if( orders.length === 0){
            return res.status(404).json({message: "No orders found"});
        }
        res.status(200).json({orders});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
    }
}



export const cancelOrderStatus = async (req, res) => {
    try {
        const { id } = req.params; // Order ID from request params
        const userRole = req.user.role; // Extract user role from token

        // Only admins can cancel orders
        if (userRole !== "admin") {
            return res.status(403).json({ message: "Access denied. Only admins can cancel orders." });
        }

        // Find the order
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Prevent cancellation if the order is already delivered
        if (order.status === "delivered") {
            return res.status(400).json({ message: "Order cannot be canceled as it has already been delivered" });
        }

        // Update order status to "cancelled"
        order.status = "cancelled";
        await order.save();

        res.status(200).json({ message: "Order canceled successfully", order });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while canceling the order", error: error.message });
    }
};


export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params; // Order ID from request params
        const userRole = req.user?.role; // Extract user role from token

        // Only admins can delete orders
        if ( userRole !== "admin") {
            return res.status(403).json({ message: "Access denied. Only admins can delete orders." });
        }

        // Find the order
        const order = await  Order.findByIdAndDelete(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

      

        res.status(200).json({ message: "Order deleted successfully", order });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while deleting the order", error: error.message });
    }
}

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params; // Order ID from request params
        const order = await Order.findById(id) .populate({
            path: "cartId",
            populate: { 
                path: "items.foodItemId",
                model: "FoodItem",  // Explicitly specify the model
                select: "name price description imageUrl category availability"  // ✅ Ensure imageUrl is included
            }
        })
        .populate("userId", "name email address contact") // Populate User details
        .populate("paymentId", "amount status") // Populate Payment details
        .select("-__v"); // Exclude unnecessary fields
        console.log("Populated Order Data:", JSON.stringify(order, null, 2)); // Log full populated order data
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order fetched successfully", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while fetching the order", error: error.message });
    }
}



