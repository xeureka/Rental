
require('dotenv').config()
const express = require('express')
const config = require('config')
const Genre = require('./routes/genres')
const customer = require('./routes/customer')
const Movies = require('./routes/movies')
const Rentals = require('./routes/rentals')
const Users = require('./routes/users')
const login = require('./routes/login')

const connectDB = require('./models/connection')


const app = express()

if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.')
    process.exit(1)
}



app.use(express.json())
app.use('/api/geners',Genre)
app.use('/api/customers',customer)
app.use('/api/movies',Movies)
app.use('/api/rentals',Rentals)
app.use('/api/users',Users)
app.use('/api/login',login)

connectDB()

const PORT = process.env.PORT || 3000; 

app.listen(PORT,() =>{
    console.log(`Server Running on port ${PORT}. `)
})