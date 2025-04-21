


const express = require('express')
const mongoose = require('mongoose')
const Users = require('../models/userSchema')
const router = express.Router()


router.post('/',async (req,res) => {

    try {

        let user = await Users.findOne({email: req.body.email})

        if (user){
            return res.status(400).send('User Already Registred !!')
        }

        user = new Users({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        await user.save()

        res.send(user)
        
    } catch (error) {
        console.log('Error Registering a user: ',error.message)
    }


})

module.exports = router