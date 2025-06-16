import mongoose from 'mongoose'
import { genreSchema } from './genres.model'

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: genreSchema,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    posterImage: {
        type: String , // later will be changed to buffer to add the image
        required: true
    },
    showTime: {
        type: [Date],
        required: true        
    }
    
})


const Movies = mongoose.model('Movie',movieSchema)

export default Movies;