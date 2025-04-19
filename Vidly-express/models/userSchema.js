
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength:4,
        maxlength: 255
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        minlength: 6,
        maxlength: 1024,
    }
})

const Users = mongoose.model('User',userSchema)

module.exports = Users


 