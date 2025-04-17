
const _ = require('lodash') 
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Users = require('../models/userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

router.post('/', async (req,res) => {

    try {

        let user = await Users.findOne({email: req.body.email})

        if (!user) return res.status(400).send('Invalid email or password !')
        

       const validPassword = await bcrypt.compare(req.body.password,user.password)
        
        if (!validPassword){
            return res.status(400).send('Invalid email or password !')
        }

        // before this we need to create a jwt

        const token = jwt.sign({_id: user._id},config.get('jwtPrivateKey'))

        res.send(token)
        
    } catch (error) {
        console.log('Error registering a user: ',error.message)
    }

})

module.exports = router

