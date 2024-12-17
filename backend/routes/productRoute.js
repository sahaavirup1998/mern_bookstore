import express from "express"
import { createProduct, deleteProduct, getAllProducts, getProductById } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post('/create', adminAuth,upload.single('image'), createProduct);
productRouter.post('/delete', adminAuth,deleteProduct);
productRouter.post('/singleProduct', getProductById);
productRouter.get('/productslist', getAllProducts);

export default productRouter;