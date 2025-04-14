
// (isGold,name,phone)

const mongoose = require('mongoose')

// customer schema

const customerSchema = new mongoose.Schema({
    isGold: {type: String, required:true},
    name: {type: String,required: true},
    phone: {type:String, required:true}
})

// customer model

const Custemers = new mongoose.model('Customer',customerSchema);

module.exports = Custemers;