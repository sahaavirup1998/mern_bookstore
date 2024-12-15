import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Function for creating a token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Controller function to handle registration
const handleUserRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if the user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password should be at least 8 characters long",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    // Generate and send JWT token
    const token = createToken(user._id);
    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error("Error in handleUserRegister:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Controller function to handle login
const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if the user exists
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }
  } catch (error) {
    console.error("Error in handleUserLogin:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Controller function to handle admin login
const handleAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASS
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid admin credentials" });
    }
  } catch (error) {
    console.error("Error in handleAdminLogin:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Export the controller functions
export { handleUserRegister, handleUserLogin, handleAdminLogin };
