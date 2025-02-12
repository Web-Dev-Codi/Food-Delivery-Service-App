import { Router } from "express";
import {
	getMenus,
	getMenusByRestaurant,
	getMenusByCategory,
	getMenuById,
	addMenu,
	updateMenu,
	deleteMenu,
} from "../controllers/Menu.js";

const menuRouter = Router();

menuRouter.get("/menu", getMenus);
menuRouter.get("/menu/restaurant/:id", getMenusByRestaurant);
menuRouter.get("/menu/:category", getMenusByCategory);
menuRouter.get("/menu/:id", getMenuById);
menuRouter.post("/menu", addMenu);
menuRouter.put("/menu/:id", updateMenu);
menuRouter.delete("/menu/:id", deleteMenu);

export default menuRouter;
