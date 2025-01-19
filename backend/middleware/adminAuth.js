import jwt from 'jsonwebtoken'

// Admin Auth
const adminAuth = async (req,res,next) => {
    try {
        // get Token from header
        const { token } = req.headers;
        // Check token 
        if (!token) {
            return res.json({success:false,message:"Not Authorized Login 1"})
        }
        // Verify token with JWT secret
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({success:false,message:"Not Authorized Login Again"})
        }
        next()
    } 
    // If error caught
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default adminAuth