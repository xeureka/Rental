
import express from 'express'
import mongoose from 'mongoose'
import {Users} from '../models/users.model'

const router = express.Router()

router.get('/', async (req,res) => {

    try {
        const result = await Users.find()
        res.json(result)

    } catch (error) {
        console.log('Error getting the users data, ',error)
    }
})

export default router