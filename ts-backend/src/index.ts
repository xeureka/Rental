import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './utils/db.connect'
import movieRoutes from './routes/movie.route'
dotenv.config()


const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use('/api/movies',movieRoutes)

connectDB()
app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`)
})