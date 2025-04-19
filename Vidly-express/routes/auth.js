
const Users = require('../models/userSchema')
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcryptjs')


router.post('/',async (req,res) => {

    const user = await Users.findOne({email: req.body.email})

    if (!user){
        return res.status(400).send('Invalid username or password .')
    }

    try {

        const salt = await bcrypt.genSalt(10);

        const validPassword = await bcrypt.compare(req.body.password, user.password)

        if (!validPassword) {
            return res.status(400).send('Invalid username or password !')
        }

        res.send(true)
        
    } catch (error) {
        console.error('Error authentication user, ',error.message)
    }
})


module.exports = router

// what the fuck we do in this lecture we do an authentication man