import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    phone: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        default: 'user' // admin
    }
})

export const Users = mongoose.model('User', userSchema)
