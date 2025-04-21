

const Users = require('../models/userSchema')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')


router.post('/',async (req,res) => {

    const user = await Users.findOne({email: req.body.email})

    if (!user){
        return res.status(401).send('Invalid username or password')
    }

    try {
        
        const isValid = await bcrypt.compare(req.body.password,user.password)

        if (!isValid){
            return res.send(400).status('Invalid email or password')
        }

        const token = jwt.sign({_id:user._id,email: user.email},config.get('jwtPrivateKey'))
   
        res.send(token)
        

        
    } catch (error) {
        console.error('Error authenticating user, ',error.message)
    }

})

module.exports = router
