import { Router } from 'express';
import { createUsers, getUsers, getUserById, updateUser, deleteUser, loginUser } from '../controllers/User.js';

const userRouter = Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:id', getUserById);
userRouter.post('/create', createUsers);
userRouter.patch('/update/:id', updateUser);
userRouter.delete('/delete/:id', deleteUser);
userRouter.post('/login', loginUser);



export default userRouter;
