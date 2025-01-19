import mongoose from "mongoose";

// Create User Shcema Which Inlcude : [ name , email , password , cartData ] 
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} } ,
    avatar : {type : String} ,
    OTP : {type : Number}
}, { minimize: false })

const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel