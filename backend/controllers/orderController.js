import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const currency = "$";
const delhiveryCharges = 15;

// place order using cash on delhivery
const handleCashOnDeliveryOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData); // Fixed this line
        await newOrder.save();

        // Clear the user's cart
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.status(200).json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// place order using stripe
const handleStripeOrder = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

// verify stripe method
const verifyStripe = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

// all orders data for admin panel

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// order details for user
const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// update order status from admin panel
const updateStatus = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export {handleCashOnDeliveryOrder, handleStripeOrder, verifyStripe, getAllOrders, getUserOrders, updateStatus}