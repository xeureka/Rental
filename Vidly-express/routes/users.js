
const _ = require('lodash') 
const express = require('express')
const router = express.Router()
const Users = require('../models/userSchema')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')


router.post('/', async (req,res) => {

    try {

        let newUser = await Users.findOne({email: req.body.email})

        if (newUser) return res.status(400).send('User already registered !')
         
        
        newUser = new Users({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })


        const salt = await bcrypt.genSalt(10)
        newUser.password = await bcrypt.hash(newUser.password,salt)
    
        await newUser.save()

        const token = jwt.sign({_id: user._id},config.get('jwtPrivateKey'))
        

    
        res.header('x-auth-token',token).send(_.pick(newUser,['_id','name','email']))

    } catch (error) {
        console.log('Error registering a user: ',error.message)
    }

})



module.exports = router
