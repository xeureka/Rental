
// Vidly movie rental app simple backend


require('dotenv').config()
const config = require('config')
const express = require('express')
const Genre = require('./routes/genres')
const customer = require('./routes/customer')
const Movies = require('./routes/movies')
const Rentals = require('./routes/rentals')
const Users = require('./routes/users')
const auth = require('./routes/auth')
const connectDB = require('./models/connection')


const app = express()
app.use(express.json())

if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.')
    process.exit(1)
}

app.use('/api/geners',Genre)
app.use('/api/customers',customer)
app.use('/api/movies',Movies)
app.use('/api/rentals',Rentals)
app.use('/api/users',Users)
app.use('/api/auth', auth)

connectDB()

const PORT = process.env.PORT || 3000; 

app.listen(PORT,() =>{
    console.log(`Server Running on port ${PORT}. `)
})

