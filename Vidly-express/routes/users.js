
const Users = require('../models/userSchema')
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
// api end point = /api/users


router.post('/',async (req,res) => {

    let user = Users.findOne({email: req.body.email})

    if (user){
        return res.status(400).send('User Already registered !')
    }

    try {

        const newUser = new Users({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })

        await newUser.save()
        res.send(newUser)
        
    } catch (error) {
        console.error('Error Registaering a user, ',error.message)
    }

})


module.exports = router