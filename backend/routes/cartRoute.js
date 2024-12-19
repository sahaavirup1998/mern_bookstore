import express from "express";
import { addToCart, getUserCart, updateCart } from "../controllers/cartController.js";
import authUser from "../middleware/auth.js";


const cartRouter = express.Router();

cartRouter.post('/addCart', authUser,addToCart);
cartRouter.post('/updateCart', authUser, updateCart);
cartRouter.post('/getCart', authUser, getUserCart);

export default cartRouter;