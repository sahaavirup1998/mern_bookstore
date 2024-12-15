import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";

// app configuration
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());
connectDB();
connectCloudinary();

// API endpoint
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.send('API connected succesfully!');
})

app.listen(port, () => {
    console.log('Server is running on PORT: ' + port); 
})

// sahaavirup6733