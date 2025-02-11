import { Router } from "express";

import { createRestaurant, getRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant, addReview } from "../controllers/Restaurant.js";
import { verifyToken } from "../middleware/auth.js";


const restaurantRouter = Router();

restaurantRouter.get("/restaurants", getRestaurants);
restaurantRouter.get("/restaurants/:id", getRestaurantById);
restaurantRouter.post("/create", createRestaurant);
restaurantRouter.post('/:id/reviews',verifyToken, addReview);
restaurantRouter.patch("/update/:id", updateRestaurant);
restaurantRouter.delete("/delete/:id", deleteRestaurant);

export default restaurantRouter;
