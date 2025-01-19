import {v2 as cloudinary } from "cloudinary"

// Cloudinary config include [ cloud name , api key , api secret ]
const connectCloudinary = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_SECRET_KEY
    })

}

export default connectCloudinary;