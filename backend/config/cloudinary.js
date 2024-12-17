import { v2 as cloudinary } from "cloudinary";
import https from "https"

const connectCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLDN_NAME, // Match your environment variable names
    api_key: process.env.CLDN_API_KEY,
    api_secret: process.env.CLDN_API_SECRET,
    secure: true,
  });
  
  cloudinary.api_proxy = new https.Agent({
    rejectUnauthorized: false,
  });

  console.log("Cloudinary connected successfully");
};

export default connectCloudinary;
