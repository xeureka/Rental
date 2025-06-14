
import express from 'express'
import dotenv from 'dotenv'

import { connectDB } from './utils/db.connect'

dotenv.config()

const app = express()


app.get('/',(req,res) => {
    res.send('Hello World')
})

connectDB()
app.listen(3000, () =>{
    console.log('server running at port 3000')
})

