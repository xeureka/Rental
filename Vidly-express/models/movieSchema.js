

// (id,title,genre,numberInStock,dailyrentalRate)

const mongoose = require('mongoose')
const {genreSchema} = require('./genreSchema')
const { required } = require('joi')



const movieSchema = new mongoose.Schema({
    title: {type:String,required:true},
    genre:{ type:genreSchema,required:true},
    numberInStock: {type: Number, required: true},
    dailyRentalRate: {type: Number, required: true}
  
})


const Movie = mongoose.model('Movie',movieSchema);


module.exports = Movie;