import {Router} from 'express';
import { getCouponById , getCouponByValidity,createCoupon, updateCoupon, deleteCoupon, getAllCoupons ,applyCoupon} from '../controllers/couponsController.js';
import { verifyToken } from '../middleware/auth.js';



const couponRouter = Router();
couponRouter.get('/', getAllCoupons);
couponRouter.get('/valid', getCouponByValidity);
couponRouter.get('/:id', getCouponById);
couponRouter.post('/create', createCoupon);
couponRouter.patch('/update/:id', updateCoupon);
couponRouter.delete('/delete/:id', deleteCoupon);
couponRouter.post('/apply', verifyToken, applyCoupon);

export default couponRouter;

