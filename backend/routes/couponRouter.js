import {Router} from 'express';
import { getCouponById , getCouponByValidity,createCoupon, updateCoupon, deleteCoupon, getAllCoupons } from '../controllers/couponsController.js';



const couponRouter = Router();
couponRouter.get('/', getAllCoupons);
couponRouter.get('/valid', getCouponByValidity);
couponRouter.get('/:id', getCouponById);
couponRouter.post('/create', createCoupon);
couponRouter.patch('/update/:id', updateCoupon);
couponRouter.delete('/delete/:id', deleteCoupon);

export default couponRouter;

