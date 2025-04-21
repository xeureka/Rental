


const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({

    name: {
        type:String,
        required: true,
        minlength: 5,
        maxlength: 255
    },

    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 233
    }
})


const Users = mongoose.model('User',userSchema)

module.exports = Users