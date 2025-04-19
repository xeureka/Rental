
const Users = require('../models/userSchema')
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const _ = require('lodash')
// api end point = /api/users


router.post('/',async (req,res) => {

    let user = await Users.findOne({email: req.body.email})

    if (user){
        return res.status(400).send('User Already registered !')
    }

    try {

        user = new Users(_.pick(req.body, ['name','email','password']))

        await user.save()


        res.send(_.pick(user,['_id','name','email']))
        
    } catch (error) {
        console.error('Error Registaering a user, ',error.message)
    }

})


module.exports = router