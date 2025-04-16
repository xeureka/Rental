
const mongoose = require('mongoose')

const rentalSchema = new mongoose.Schema({

    customer: {
        type: new mongoose.Schema({
            name: {type:String,required:true,minlength: 0,maxlength: 255},
            isGold: {type: String, required:true},
            phone: {type: String, required:true}
        })
    },

    movie: {
        type: new mongoose.Schema({
            title: {type:String,required:true},
            dailyRentalRate: {type:String,required:true}
        })
    },

    dateOut :{type:Date,required:true,default:Date.now},
    dateReturned: {type:Date},
    rentalFee: {type: Number,required:false,min:0}    

})

const Rentals = mongoose.model('Rental',rentalSchema);

module.exports = Rentals
