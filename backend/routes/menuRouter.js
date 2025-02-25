import { Router } from "express";
import {
	getMenus,
	getMenusByRestaurant,
	getMenusByCategory,
	getMenuById,
	addMenu,
	updateMenu,
	deleteMenu,
	getMenuByName,
	updateMenuByName,
} from "../controllers/Menu.js";

const menuRouter = Router();
menuRouter.get("/menu/getByName/:name", getMenuByName);
menuRouter.get("/menu/singlemenu/:id", getMenuById);
menuRouter.get("/menu/restaurant/:id", getMenusByRestaurant);
menuRouter.patch("/menu/updateByName/:name", updateMenuByName);


menuRouter.get("/menu/:category", getMenusByCategory);
menuRouter.get("/menu", getMenus);
menuRouter.post("/menu", addMenu);
menuRouter.patch("/menu/:id", updateMenu);
menuRouter.delete("/menu/:id", deleteMenu);

export default menuRouter;
