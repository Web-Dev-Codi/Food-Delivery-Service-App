import { Router } from "express";
import { 
    createOrder,
    getOrders,
    cancelOrderStatus,
    deleteOrder,
    getOrderById
  
  } from "../controllers/orderController.js";
import { verifyAdmin, verifyToken } from "../middleware/auth.js";

const orderRouter = Router();

orderRouter.post("/add",verifyToken, createOrder);
orderRouter.get("/get",verifyToken,verifyAdmin ,getOrders);
orderRouter.patch("/cancel/:id",verifyToken,verifyAdmin, cancelOrderStatus);
orderRouter.delete("/delete/:id",verifyToken,verifyAdmin, deleteOrder);
orderRouter.get("/get/:id",verifyToken,verifyAdmin, getOrderById);
/* 

orderRouter.get("/get/user/:id", getOrdersByUserId);
orderRouter.patch("/update/:id", updateOrder);

 */

export default orderRouter;
