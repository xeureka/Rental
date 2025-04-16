

// (id,title,genre,numberInStock,dailyrentalRate)

const mongoose = require('mongoose')
const {genreSchema} = require('./genreSchema')
const Joi = require('joi')


const movieSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        minlength:4,
        maxlength:255
    },

    genre: {
        type: genreSchema,
        required: true
    },

    numberInStock: {
        type:Number,
        required: true,
        min: 0,
        max: 255
    },

    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}) 



const Movies = mongoose.model('Movie',movieSchema);


module.exports = Movies;