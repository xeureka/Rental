
// (id,title,genre,numberInStock,dailyrentalRate)


const express = require('express')
const router = express.Router()
const Movies = require('../models/movieSchema')


router.get('/',async (req,res) =>{

    try {

        const result = await Movies.find()

        res.send(result)
        
    } catch (error) {
        console.log('Error opening the document: ',error.message)
    }
    
})

// (id,title,genre,numberInStock,dailyrentalRate)

router.post('/', async (req,res) => {

    try {

        const newMovie = new Movies({
            title: req.body.title,
            genre: req.body.genre,
            numberInStock : req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        })

        await newMovie.save()

        res.send(newMovie)
        
    } catch (error) {
        console.log('something went wrong, ',error.message)
    }

})




router.delete('/:id', async (req,res) => {

    try {

        const id = req.params.id

        const result = await Movies.findByIdAndDelete(id)

        res.send(result)


        
    } catch (error) {
        console.log('Error finding the Id: ',error.message)
    }


})


module.exports = router


/**
 * post new movies
 * put existing movie
 * delete movie collection
 */