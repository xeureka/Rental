
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')

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

userSchema.methods.generateAuthToken = function(){
    
    const token = jwt.sign({_id: this.id},config.get('jwtPrivateKey'))

    return token;
}

const Users = mongoose.model('User',userSchema)

module.exports = Users