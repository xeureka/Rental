

import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

export async function connectDB(){
    try {

        await mongoose.connect(process.env.MONGO_URI!)
        console.log('db connection success !!')
    } catch (error) {
        console.log('Error connecting db: ',error)
    }
} 