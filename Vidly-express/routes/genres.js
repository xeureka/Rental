

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
    genre: Joi.string().min(2).max(15).required()
})

// genre schema validator middleware
const validateGenre = (req,res,next) => {

    const {error} = genreSchema.validate(req.body);

    if (error){
        return res.status(400).send({message: error.details[0].message})
    }
    next()
}

// creating a new genra : here is what the real play comes

router.post('/',validateGenre,(req,res) => {

    const newGenre = {
        id: catagories.length + 1,
        genre: req.body.genre
    }

    catagories.push(newGenre)
    res.send(catagories)
})

// updating an existing genre

router.put('/:id',validateGenre,(req,res) =>{

    const id = req.params.id;
    const newGenre = catagories.find(g => g.id === parseInt(id));

    if (!newGenre){
        return res.send(400).send('Genre Not Found')
    }

    newGenre.genre = req.body.genre;

    res.send(catagories);
})

// delete existing genre

router.delete('/:id',(req,res) =>{
    
    const id = req.params.id
    const genra = catagories.find(g => g.id === parseInt(id))

    if(!genra){
        return res.send(400).send('Genre Not Found')
    }

    const index = catagories.indexOf(genra);

    catagories.splice(index,1);
    res.send(catagories)
})

module.exports = router

