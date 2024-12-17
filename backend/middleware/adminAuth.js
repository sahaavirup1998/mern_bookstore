import jwt from "jsonwebtoken"

const adminAuth = async (req, res, next) => {
    try {
        const {token} = req.headers;
        if (!token) {
            return res.status(401).json({success: false, message: "Not authorized please login again" });
        }
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASS){
            return res.status(403).json({success: false, message: "Unauthorized Access" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: "Server Error" });
    }
}

export default adminAuth;