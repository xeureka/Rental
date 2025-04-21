

const Users = require('../models/userSchema')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')


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

        res.send(true)
        

        
    } catch (error) {
        console.error('Error authenticating user, ',error.message)
    }

})

module.exports = router
