
const Users = require('../models/userSchema')
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

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

        // instead of responding with bool we need jwt here

        const token = jwt.sign({_id: user._id},config.get('jwtPrivateKey'))

        res.send(token)

        
    } catch (error) {
        console.error('Error authentication user, ',error.message)
    }
})


module.exports = router