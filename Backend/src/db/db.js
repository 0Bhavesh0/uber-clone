import mongoose from "mongoose";


const connectDB = async () => {
    try {
        console.log("connecting to mongodb");
        const connectionInstance = await mongoose.connect("mongodb://127.0.0.1:27017/uber-clone")
        console.log(`mongodb connected to ${connectionInstance.connection.host}`);

        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB