import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB.URI;
        if (!mongoURI) {
            throw new Error("MongoDB URI is not defined in environment variables");
        }

        await mongoose.connect(mongoURI);
        console.log("MongoDB connected successfully");

    } catch (error) {
        console.error(" MongoDB connection error:", error);
        process.exit(1); //exit with failure
        //status code 1 means failure
        //status code 0 means success
    }
};