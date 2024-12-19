import express from "express"
import { createProduct, deleteProduct, getAllProducts, getProductById } from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

productRouter.post('/create',upload.single('image'), createProduct);
productRouter.post('/delete',deleteProduct);
productRouter.post('/singleProduct', getProductById);
productRouter.get('/productslist', getAllProducts);

export default productRouter;