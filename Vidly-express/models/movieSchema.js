

// (id,title,genre,numberInStock,dailyrentalRate)

const mongoose = require('mongoose')
const genreSchema = require('./genreSchema')
const Genre = require('./genreSchema')



const movieSchema = new mongoose.Schema({

    title: {type:String,required:true},
    genre: {
        type: genreSchema,
        ref: Genre
    },

    numberInStock: {type:Number,requied:true},
    dailyRentalRate: {type:Number,required: true}

})


const Movie = mongoose.model('Movie',movieSchema);


module.exports = Movie;


