import { Router } from 'express';
import { createUsers, getUsers, getUserById, updateUser, deleteUser ,loginUser} from '../controllers/User.js';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/create', createUsers);
router.patch('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);
router.post('/login', loginUser);



export default router;