import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const {token} = req.headers;
    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized please login again" });
    }
    try {
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decoded.id;
        next();
    } catch (error) {
        console.error("Error in authUser middleware:", error);
        res.status(500).json({ success: false, message: "Server error" }); 
    }
 };
 
 export default authUser;
