

require('dotenv').config()
const mongoose = require('mongoose')

async function createDB(){
    try {

        await mongoose.connect(process.env.MONGO_URI)
        console.log('DB connection sucessfully !!')
        
    } catch (error) {
        console.log('Error connecting DB, ',error.message)
    }
}

module.exports = createDB;
