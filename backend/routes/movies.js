
// (id,title,genre,numberInStock,dailyrentalRate)


const express = require('express')
const router = express.Router()
const {Genre} = require('../models/genreSchema')
const Movies = require('../models/movieSchema')
const auth = require('../middleware/auth')

router.get('/', async (req,res) => {
    try {
        const result = await Movies.find()
        res.send(result)
    } catch (error) {
        console.log('Error getting data, ',error.message)
    }
})


router.post('/',auth, async (req,res) =>{

   
    const genre = await Genre.findById(req.body.genreId);
    

    if (!genre) {
        return res.status(400).send('Invalid genre.')
    }

    try {

        let newMovie = new Movies({
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        })

        const result = await newMovie.save()

        res.send(result)
        
    } catch (error) {
        console.log('Error creating, ',error.message)
    }
})


module.exports = router
