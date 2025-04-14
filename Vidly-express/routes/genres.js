

const express = require('express')
const router = express.Router()
const Joi = require('joi')
const mongoose = require('mongoose')
const Genre = require('../models/movieSchema')


// Getting all the list of geners
router.get('/',async (req,res) =>{
    const genres = await Genre.find()
    res.send(genres)
})

// Getting a single genre
router.get('/:id',async (req,res) =>{
    const id = req.params.id;

    try {
        const result = await Genre.findById(id)
        console.log(result)
        res.send(result)

    } catch (error) {
        console.log('Error occured, ',error.message)
        return
    }

})


// genre input schema
const genreSchema = Joi.object({
    name: Joi.string().min(2).max(15).required()
})

// genre schema validator middleware
const validateGenre = (req,res,next) => {

    const {error} = genreSchema.validate(req.body);

    if (error){
        return res.status(400).send({message: error.details[0].message})
    }
    next()
}


router.post('/',validateGenre,async (req,res) => {

    try {

        const newGenre = new Genre({
            name: req.body.name
        })

        const result = await newGenre.save()
        
        res.send(result)

    } catch (error) {
        res.status(400).send(error.message)
        console.log(error)
    }
})

// updating an existing genre (we will gonna use the findByIdAndUpdate)
router.put('/:id',validateGenre,async (req,res) =>{

    const id = req.params.id;
    const newName = req.body.name;
    console.log(newName)

    
    try {

        const updatedName = await Genre.findByIdAndUpdate(
            id,
            {name: newName},
            {new: true, runValidators: true}
        )

        if (!updatedName){
            return res.status(404).send('Genre Not Found')
        }
        

        res.send(updatedName)

        
    } catch (error) {
        console.log('Error: ',error.message)
    }

})

// delete existing genre
router.delete('/:id', async (req,res) =>{

    const id = req.params.id;

    try {
        const result = await Genre.findByIdAndDelete(id);

        console.log('Deleted course ',result)
        res.send(result)
        
    } catch (error) {
        console.log(error)
    }
    
})



module.exports = router

