import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import razorpay from 'razorpay'

// Global Variables 
const currency = 'inr'
const deliveryCharge = 10

// Gateway Initialize
const razorpayInstance = new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET,
})

// Place Order 
// COD Method
const placeOrder = async (req,res) => {
    try {
        // Fetch userid, items , amount , address from req body
        const { userId, items, amount, address} = req.body;
        // Order data object
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()
        }
        // Create a new Order
        const newOrder = new orderModel(orderData)
        // Save the order
        await newOrder.save()
        // Update the user cart empty
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        // Return resposne
        res.json({success:true,message:"Order Placed"})
    } 
    //If Error Caught
    catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// Razorpay Method
const placeOrderRazorpay = async (req,res) => {
    try {
        // Fetch The userid , items , amount , address from request body
        const { userId, items, amount, address} = req.body
        // Ordered data object
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"Razorpay",
            payment:false,
            date: Date.now()
        }
        // Create a new Order
        const newOrder = new orderModel(orderData)
        // Save newOrder
        await newOrder.save()
        
        // Amount update paisa to the ruppes
        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt : newOrder._id.toString()
        }

        // Razorpay order is created and sent back to the client  
        await razorpayInstance.orders.create(options, (error,order)=>{
            // If error occure then 
            if (error) {
                console.log(error)
                return res.json({success:false, message: error})
            }
            res.json({success:true,order})
        })

    } 
    // If error caught
    catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// Verify That Razorpay 
const verifyRazorpay = async (req,res) => {
    try {
        // Fetch user id and razorpay id from req body
        const { userId, razorpay_order_id  } = req.body
        // Retrive order infromation from Razorpay server
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        // Check is paid or not
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({ success: true, message: "Payment Successful" })
        } 
        else {
             res.json({ success: false, message: 'Payment Failed' });
        }
    } 
    //If error caught
    catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


// All Orders data for Admin Panel
const allOrders = async (req,res) => {
    try {
        // Fetch All orders
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    } 
    // If error caught
    catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// User Order Data For Forntend
const userOrders = async (req,res) => {
    try {
        // Fetch the user id
        const { userId } = req.body
        // Find order from the id
        const orders = await orderModel.find({ userId })
        // Return resposne
        res.json({success:true,orders})
    } 
    // If error caught
    catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// update order status from Admin Panel
const updateStatus = async (req,res) => {
    try {
        // Fetch status and order id from req body
        const { orderId, status } = req.body
        //Update from the id 
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({success:true,message:'Status Updated'})
    } 
    // If error caught
    catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {verifyRazorpay ,placeOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus}