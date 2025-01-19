import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

// Product Controller 

// For Add Product
const addProduct = async (req, res) => {
    console.log("add");
    try {
        // Fetch The data from the req body
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]
        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        // Upload to the cloudinary
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        // Create the product object
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        // Create a new productModel
        const product = new productModel(productData);
        await product.save()

        // Return Response
        res.json({ success: true, message: "Product Added" })

    } 
    // If Error caught
    catch (error) {
        console.log(error)
        res.json({ success: false, message: "Product can't add" })
    }
}

// function for list product
const listProducts = async (req, res) => {
    try {
        // For finding products and send Response
        const products = await productModel.find({});
        res.json({success:true,products})
    } 
    // If error caught
    catch (error) {
        console.log(error)
        res.json({ success: false, message: "Product List Error" })
    }
}

// function for removing product
const removeProduct = async (req, res) => {
    try {
        // Find the id of product , which you want to remove and then delete that product and send Response
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})
    } 
    // If error caught
    catch (error) {
        console.log(error)
        res.json({ success: false, message: "Product Remove error" })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        // Find the product id
        const { productId } = req.body
        // Now find product from it's id
        const product = await productModel.findById(productId)
        // Return response 
        res.json({success:true,product})
    } 
    // If error caught
    catch (error) {
        console.log(error)
        res.json({ success: false, message: "Single Product Erorr" })
    }
}

// Now Export All Controllers 
export { listProducts, addProduct, removeProduct, singleProduct }