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
import { verifyToken, verifyAdmin } from "../middleware/auth.js";

const menuRouter = Router();
menuRouter.get("/menu/getByName/:name", getMenuByName);
menuRouter.get("/menu/singlemenu/:id", getMenuById);
menuRouter.get("/menu/restaurant/:id", getMenusByRestaurant);
menuRouter.patch("/menu/updateByName/:name",verifyToken,verifyAdmin, updateMenuByName);


menuRouter.get("/menu/:category", getMenusByCategory);
menuRouter.get("/menu", getMenus);
menuRouter.post("/menu",verifyToken,verifyAdmin ,addMenu);
menuRouter.patch("/menu/:id",verifyToken,verifyAdmin, updateMenu);
menuRouter.delete("/menu/:id",verifyToken,verifyAdmin, deleteMenu);

export default menuRouter;
