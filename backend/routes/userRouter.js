import { Router } from "express";
import {
	createUsers,
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
	loginUser,
} from "../controllers/User.js";
import { verifyToken } from "../middleware/auth.js";

const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.get("/users/:id", verifyToken, getUserById);
userRouter.post("/create", createUsers);
userRouter.patch("/update/:id", verifyToken, updateUser);
userRouter.delete("/delete/:id", deleteUser);
userRouter.post("/login", loginUser);

export default userRouter;
