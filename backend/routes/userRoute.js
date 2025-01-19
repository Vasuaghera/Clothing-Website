import express from 'express';
import { loginUser,registerUser,adminLogin , verifyAccount } from '../controllers/userController.js';

// For user route
const userRouter = express.Router();

// Post request for register , login and admin
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.post('/verifyemail',verifyAccount)
// userRouter.put('/change-username', changeUserName);

export default userRouter;