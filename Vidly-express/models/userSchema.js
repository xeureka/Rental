
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
})

userSchema.methods.genereateAuthToken = function (){
    const token = jwt.sign({_id: this._id},config.get('jwtPrivateKey'))

    return token
}

const Users = mongoose.model('User',userSchema);

module.exports = Users