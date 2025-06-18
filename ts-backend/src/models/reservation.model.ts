import mongoose from 'mongoose'

const reservationSchema = new mongoose.Schema({
    userId: String,
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    },
    seats: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
})


export const Reservations = mongoose.model('Reservation',reservationSchema)