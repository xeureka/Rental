// Vidly movie rental app simple backend


require('dotenv').config()

const express = require('express')
const geners = require('./routes/genres')
const customer = require('./routes/customer')
const Movies = require('./routes/movies')
const connectDB = require('./models/connection')


const app = express()
app.use(express.json())

app.use('/api/geners',geners)
app.use('/api/customers',customer)
app.use('/api/movies',Movies)

connectDB()

const PORT = process.env.PORT || 3000; 

app.listen(PORT,() =>{
    console.log(`Server Running on port ${PORT}. `)
})

