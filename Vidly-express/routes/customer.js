

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Customer = require('../models/customerSchema')
const auth = require('../middleware/auth')

// all customer list
router.get('/', async (req,res) =>{
   
    const result = await Customer.find()
    
    res.send(result)
})

// GET a single customer by id
router.get('/:id',async (req,res) =>{
    const id = req.params.id;

    try {
        const custom = await Customer.findById(id)
        res.send(custom)
        
    } catch (error) {
        console.log('Given customer is not found !!',error)
    }
})

// create new customer
router.post('/',auth,async (req,res) =>{

    try {

        const newCustomer = new Customer({
            isGold: req.body.isGold,
            name: req.body.name,
            phone: req.body.phone
        })

        await newCustomer.save()

        res.send(newCustomer)
        
    } catch (error) {
        console.log('Error creating a customer: ',error)
    }
})

// update customer

router.put('/:id',auth, async (req,res) => {

    const id = req.params.id;

    try {

        const updatedCustomer = await Customer.findByIdAndUpdate(
            id,
            {
                isGold: req.body.isGold,
                name: req.body.name,
                phone: req.body.phone
            },


            {new: true,runValidators: true}
        )

        if(!updatedCustomer){
            return req.status(404).send('Customer Not Found')
        }

        res.send(updatedCustomer)
        
    } catch (error) {
        console.log('Error occured while updating, ',error)
    }
})


router.delete('/:id',auth, async (req,res) =>{

    try {

        const id = req.params.id;

        const result = await Customer.findByIdAndDelete(id);
        
        res.send(result)
        
    } catch (error) {
        console.log('Customer Not Found: ',error)
    }
})

module.exports = router