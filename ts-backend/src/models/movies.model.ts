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
        type: Buffer,
        required: true
    },
    showTime: {
        type: [Date],
        required: true        
    }
    
    // number in stock
    // daily rental date
})


const Movies = mongoose.model('Movie',movieSchema)

export default Movies;
