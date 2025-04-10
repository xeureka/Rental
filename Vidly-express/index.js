// Vidly movie rental app simple backend


require('dotenv').config()

const express = require('express')
const geners = require('./routes/genres')

const app = express()
app.use(express.json())
app.use('/api/geners',geners)


const PORT = process.env.PORT || 3000; 
app.listen(PORT,() =>{
    console.log(`Server Running on port ${PORT}. `)
})