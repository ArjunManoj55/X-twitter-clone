import mongoose from "mongoose";

const connectMongoDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log('mongo connected')
    }catch (error) {
        console.error('failed to connect');
    }
}

export default connectMongoDB;