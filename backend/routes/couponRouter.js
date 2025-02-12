import {Router} from 'express';
import { getCouponById , getCouponByValidity, getCouponByRestaurant, createCoupon, updateCoupon, deleteCoupon } from '../controllers/couponsController.js';



const couponRouter = Router();

couponRouter.get('/:id', getCouponById);
couponRouter.get('/valid', getCouponByValidity);
couponRouter.get('/restaurant/:id', getCouponByRestaurant);
couponRouter.post('/create', createCoupon);
couponRouter.patch('/update/:id', updateCoupon);
couponRouter.delete('/delete/:id', deleteCoupon);

export default couponRouter;

