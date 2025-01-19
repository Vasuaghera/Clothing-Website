import userModel from "../models/userModel.js"

// Cart Controller

// add products to user cart
const addToCart = async (req,res) => {
    try {
        // Fetch user id , itemid and size from req body
        const { userId, itemId, size } = req.body
        // Fetch All User Records from id 
        const userData = await userModel.findById(userId)
        // Extract cart data from user data
        let cartData = await userData.cartData;
        // Check item is already in cart 
        if (cartData[itemId]) {
            // Size is also present in Cart
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            }
            // Size not present in Cart
            else {
                cartData[itemId][size] = 1
            }
        } 
        // Add new Item in Cart
        else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        // Update Cart Data 
        await userModel.findByIdAndUpdate(userId, {cartData})
        // Return Response
        res.json({ success: true, message: "Added To Cart" })
    } 
    // If Error Caught
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// update user cart
const updateCart = async (req,res) => {
    try {
        // Fetch userid , itemid , size , quantity
        const { userId ,itemId, size, quantity } = req.body
        // Extract all User Data or Records
        const userData = await userModel.findById(userId)
        // Extract cart data from user data
        let cartData = await userData.cartData;
        // Update the quantity
        cartData[itemId][size] = quantity
        // Update Cart
        await userModel.findByIdAndUpdate(userId, {cartData})
        // Return Response
        res.json({ success: true, message: "Cart Updated" })
    } 
    // If Error caught
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Get User Cart Data
const getUserCart = async (req,res) => {
    try {
        // Fetch user id
        const { userId } = req.body
        // Extract User Data
        const userData = await userModel.findById(userId)
        // Extract Cart Data
        let cartData = await userData.cartData;
        // Return Response
        res.json({ success: true, cartData })
    } 
    // If Error Caught
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// Export
export { addToCart, updateCart, getUserCart }