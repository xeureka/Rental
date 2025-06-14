import mongoose from 'mongoose'

const reserveSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {type: String, required: true},
            phone: {type: String, required: true}
        })
    },
    movie : {
        type: new mongoose.Schema({
            title: {type: String, required: true},
            showTime: {type: String, required: true}
        })
    },
    reserveFee: {
        type: Number,
        required: true
    }
})

const Reservations = mongoose.model('Reservation', reserveSchema)

export default Reservations;