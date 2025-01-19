import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())
// console.log("Hi11")

// Routing
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

// Api Working or not
app.get('/',(req,res)=>{
    res.send("API Working successfully")
})
// app.get("/mail", sendMail);
// Listen 
app.listen(4000, () => {
    console.log('Server is running on port 4000');
  }).on('error', (err) => {
    console.error('Error starting server:', err);
  });