import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// function to create a product
const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, popular } = req.body;
    let imageUrl = "https://via.placeholder.com/150";

    // Ensure req.file exists before attempting upload
    if (req.file) {
      try {
        console.log("Uploading file to Cloudinary...");
        const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
          resource_type: "image",
        });
        imageUrl = uploadedImage.secure_url;
        console.log("Uploaded Image URL:", imageUrl);
      } catch (cloudinaryError) {
        console.error("Cloudinary Upload Error:", cloudinaryError);
        return res
          .status(500)
          .json({ success: false, message: "Image upload failed" });
      }
    } else {
      console.warn("No file uploaded; using placeholder image.");
    }

    // Validate product data
    if (!name || !description || !category || !price) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Prepare product data
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      popular: popular === "true" ? true : false,
      image: imageUrl,
      date: new Date(),
    };
    console.log("Product Data:", productData);

    // Save product to MongoDB
    const product = new productModel(productData);
    await product.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Product Created Successfully",
        product,
      });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// function to delete a product
const deleteProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.status(200).json({success: true, message: "Product Deleted Successfully"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// function to list all product
const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false, message: "Server Error" });
  }
};

// function to get a single product
const getProductById = async (req, res) => {
  try {
    const {productId} = req.body;
    const product = await productModel.findById(productId);
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false,message: "Server Error" });
  }
};

export { createProduct, deleteProduct, getAllProducts, getProductById };
