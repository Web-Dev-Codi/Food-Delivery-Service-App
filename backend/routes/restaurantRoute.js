import { Router } from "express";

import { createRestaurant, getRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant } from "../controllers/Restaurant.js";


const restaurantRouter = Router();

restaurantRouter.get("/restaurants", getRestaurants);
restaurantRouter.get("/restaurants/:id", getRestaurantById);
restaurantRouter.post("/create", createRestaurant);
restaurantRouter.patch("/update/:id", updateRestaurant);
restaurantRouter.delete("/delete/:id", deleteRestaurant);


export default restaurantRouter;