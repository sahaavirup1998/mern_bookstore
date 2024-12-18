import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        // Extract token from headers
        const token = req.headers.token;

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized. Please log in again.",
            });
        }

        // Decode the token using the JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Validate the email in the decoded token against the admin email
        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized Access",
            });
        }

        // Token is valid, allow the request to proceed
        next();
    } catch (error) {
        console.error("Error in adminAuth middleware:", error.message);

        // Handle expired or invalid tokens
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token has expired. Please log in again.",
            });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid token. Please log in again.",
            });
        }

        // Handle other errors
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export default adminAuth;
