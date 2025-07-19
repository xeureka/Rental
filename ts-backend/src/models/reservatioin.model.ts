
import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    userId: String, // to be replaceed like the movieId
    showtimeId: String,
    movieId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Movie'
    },
    seats: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const Reservation = mongoose.model('Reservation', reservationSchema)