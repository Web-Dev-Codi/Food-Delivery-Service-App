import { Router } from 'express';
import { createUsers, getUsers, getUserById, updateUser, deleteUser ,loginUser} from '../controllers/User.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id',verifyToken, getUserById);
router.post('/create',createUsers);
router.patch('/update/:id',verifyToken, updateUser);
router.delete('/delete/:id',verifyToken, deleteUser);
router.post('/login', loginUser);



export default router;