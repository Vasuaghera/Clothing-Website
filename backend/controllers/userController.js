import validator from "validator";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";
import mailSender from "../util/MailSender.js";
import otpGenerator from "otp-generator" ;
import "dotenv/config";
// Create Token For User
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Controller for Login User
const loginUser = async (req, res) => {
    
    try {
        // Get email and passoerd from body
        const { email, password } = req.body;
        // Find using that email
        const user = await userModel.findOne({ email });
        // If user is valid or not for login
        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }
        // Password is match or not 
        const isMatch = await bcrypt.compare(password, user.password);
        // Check password is match then call
        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        }
        // If Password is not matchS
        else {
            res.json({ success: false, message: 'Invalid credentials' })
        }
    } 
    // If error Caught
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Login User Error " })
    }
}

// Controller for Register User
const registerUser = async (req, res) => {
    try {
        // For register user
        // Get the name , email and password from the body
        const { name, email, password } = req.body;
        // checking user already exists or not
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }
        // Check email is validate or not 
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        // Check the length of the password for strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }
        // For avtar 
        const avatar = `https://api.dicebear.com/9.x/initials/svg?seed=${name}`;
        // For Otp
        const OTP = 0;
        // Hashed password for security with bcrypt
        // Random value added to the password before hashing 
        // Salting ensures that even if two users have the same password, their hashed passwords will be different
        const salt = await bcrypt.genSalt(10)
        // Create a hash version of the password with the Combination of Plain Text password and Salt password
        const hashedPassword = await bcrypt.hash(password, salt)
        // Create a new user 
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword ,
            avatar,
            OTP ,
        });
        // Save that new user
        const user = await newUser.save()
        // Crate the token for that user
        const token = createToken(user._id)
        // Return the response with token
        res.json({ success: true, token })
    } 
    // If error Caught
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "try ma j nai jatu" })
    }
}

const verifyAccount = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await userModel.findOne({
        email,
      });
      const OTP = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        digits: true,
        lowerCaseAlphabets: false,
      });
      const name = user.name;
      mailSender(
        email,
        "OTP",
        `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OTP Verification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              color: #333;
              margin: 0;
              padding: 0;
          }
          .email-container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              overflow: hidden;
          }
          .email-header {
              background-color: tomato;
              color: white;
              text-align: center;
              padding: 20px;
          }
          .email-header img {
              max-width: 150px;
              margin-bottom: 10px;
          }
          .email-content {
              padding: 20px;
          }
          .otp-code {
              font-size: 24px;
              font-weight: bold;
              color: tomato;
              margin: 20px 0;
              text-align: center;
          }
          .email-footer {
              text-align: center;
              padding: 20px;
              background-color: #f4f4f4;
              font-size: 14px;
              color: #777;
          }
          .email-footer a {
              color: tomato;
              text-decoration: none;
          }
          .coupon-message {
              background-color: #ffe5e5;
              border-radius: 8px;
              padding: 15px;
              margin-top: 20px;
              text-align: center;
              color: #555;
          }
          .coupon-message strong {
              color: tomato;
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="email-header">
              <img src='https://res.cloudinary.com/db99r7ugz/image/upload/v1722530561/logo_ijofdh.png' alt="Company Logo">
              <h1>Verify Your Email Address</h1>
          </div>
          <div class="email-content">
              <p>Hello, ${name}</p>
              <p>Thank you for registering with us. To complete your sign-up process, please use the following One-Time Password (OTP) to verify your email address:</p>
              <div class="otp-code">${OTP}</div>
              
              <p>This OTP is valid for the next 10 minutes. Please do not share this code with anyone.</p>
              <p>If you did not request this email, please ignore it.</p>
  
              <div class="coupon-message">
                  <p><strong>Special Offer:</strong> Use the coupon code <strong>FIRST-ORDER</strong> during your first purchase to enjoy <strong>free delivery</strong>!</p>
              </div>
          </div>
          <div class="email-footer">
              <p>Best regards,<br>Quick Byte</p>
              <p><a href="https://yourcompanywebsite.com">Visit our website</a></p>
          </div>
      </div>
  </body>
  </html>
  `
      );
      const newUser = await userModel.findOneAndUpdate(
        { email },
        {
          OTP,
        },
        {
          new: true,
        }
      );
      return res
        .status(200)
        .json({ message: "OTP sent successfully", success: true, newUser });
    } catch (error) {
      return res.status(401).json({
        message: "Something went wrong",
        success: false,
      });
    }
  };
// Controller for Admin
const adminLogin = async (req, res) => {
    try {
        //Get the email and password from body
        const {email,password} = req.body
        // verify both email and password with admin pass and email 
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // Generate token
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            // Resposne token
            res.json({success:true,token})
        } 
        // Email or pass doesn't match  
        else {
            res.json({success:false,message:"Invalid credentials in admin"})
        }
    } 
    // If error caught
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "admin error" })
    }
}

// Export All three controllers
export { loginUser, registerUser, adminLogin , verifyAccount }