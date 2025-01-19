import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async () => {
    try {
        // Attempt to establish a connection
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connection successful");
        
        // Log when the connection is established
        mongoose.connection.on("connected", () => {
            console.log("DB Connected");
        });
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); // Exit the application if connection fails
    }
};

export default connectDB;
