import mongoose from "mongoose";



async function connectToDB() {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("Error connecting to MongoDB:", err);
    }
    
}

export default connectToDB

