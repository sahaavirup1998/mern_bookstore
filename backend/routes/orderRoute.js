import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";
import { getAllOrders, getUserOrders, handleCashOnDeliveryOrder, handleStripeOrder, updateStatus, verifyStripe } from "../controllers/orderController.js";

const orderRouter = express.Router();

// for admin
orderRouter.post('/list', getAllOrders);
orderRouter.post('/status', updateStatus);

// for payment
orderRouter.post('/place', authUser, handleCashOnDeliveryOrder);
orderRouter.post('/stripe', authUser, handleStripeOrder);

// verify payment
orderRouter.post('/verifystripe', authUser, verifyStripe);

// for user
orderRouter.post('/userorders', authUser, getUserOrders)

export default orderRouter;