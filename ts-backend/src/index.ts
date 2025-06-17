
import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './utils/db.connect'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())


app.get('/',(req,res) => {
    res.send('Hello World')
})


connectDB()
app.listen(PORT, () =>{
    console.log(`Server runnin on port ${PORT}`)
})

