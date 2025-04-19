
const Users = require('../models/userSchema')
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')


router.post('/',async (req,res) => {

    let user = await Users.findOne({email: req.body.email})

    if (user){
        return res.status(400).send('User Already registered !')
    }

    // we wnat to add some kind of method to generate token

    try {


        const salt = await bcrypt.genSalt(10)

        user = new Users({
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password,salt)
        })

        await user.save()

        const token = user.generateAuthToken()

        res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']))
        

    } catch (error) {
        console.error('Error Registering a user, ',error.message)
        res.status(500).send('Internal Server Error !')
    }

})


module.exports = router


