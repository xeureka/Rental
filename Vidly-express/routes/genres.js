
const auth = require('../middleware/auth')
const express = require('express')
const router = express.Router()
const Joi = require('joi')
const Genre = require('../models/genreSchema')
const mongoose = require('mongoose')


 router.get('/',async (req,res) =>{

    try {

        const result = await Genre.find()

        res.send(result)
        
    } catch (error) {
        console.log('Error: ',error.message)
    }

})



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


const genreSchema = Joi.object({
    name: Joi.string().min(2).max(15).required()
})

const validateGenre = (req,res,next) => {

    const {error} = genreSchema.validate(req.body);

    if (error){
        return res.status(400).send({message: error.details[0].message})
    }
    next()
}


router.post('/',auth,async (req,res) => {


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


router.put('/:id',auth,async (req,res) =>{

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

router.delete('/:id',auth, async (req,res) =>{

    const id = req.params.id;

    try {
        const result = await Genre.findByIdAndDelete(id);

        res.send(result)
        
    } catch (error) {
        console.log(error)
    }
    
})
     

module.exports = router
