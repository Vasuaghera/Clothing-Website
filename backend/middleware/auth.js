import jwt from 'jsonwebtoken'

// Authenticate The User
const authUser = async (req, res, next) => {
    // Get Token from the request header 
    const { token } = req.headers;
    // Validate That Token
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }
    // Verify That using Try and Catch
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()
    } 
    // Error Caught
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export default authUser