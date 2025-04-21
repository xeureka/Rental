


const express = require('express')
const mongoose = require('mongoose')
const Users = require('../models/userSchema')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')


router.post('/',async (req,res) => {

    try {

        let user = await Users.findOne({email: req.body.email})
 
        if (user){
            return res.status(400).send('User Already Registred !!')
        }

        const salt = await bcrypt.genSalt(10)

        user = new Users({
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password,salt)
        })

        await user.save()

        const token = user.generateToken()
        
        res.header('x-auth-token',token).send({name: user.name, email: user.email})
        
    } catch (error) {
        console.log('Error Registering a user: ',error.message)
    }


})

module.exports = router
