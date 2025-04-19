
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Movies = require('../models/movieSchema')
const Customer = require('../models/customerSchema')
const Rentals = require('../models/rentalSchema')
const auth = require('../middleware/auth')


router.get('/', async (req,res) =>{

    const result = await Rentals.find().sort('-dateOut');

    res.send(result)
})


router.post('/',auth,async (req,res) =>{

    const customers = await Customer.findById(req.body.customerId)
    if(!customers)  return res.send(400).send('Customer Not Found, ')

    const movie = await Movies.findById(req.body.movieId)
    if(!movie)  return res.send(400).send('Movie Not Found, ')
    
    if (movie.numberInStock === 0) return res.status(400).send('Movie is out of stock !')



    try {

        let newRental = new Rentals({
            customer: { 
                _id: customers._id,
                name:customers.name,
                isGold: customers.isGold,
                phone: customers.phone
            },

            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            },

        })

        const rental = await newRental.save()

        movie.numberInStock--;
        movie.save()

        res.send(rental)

        
    } catch (error) {
        console.log('Error creating rental, ',error.message)
    }

})


module.exports = router

