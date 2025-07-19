import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './utils/db.connect'
import movieRoute from './routes/movie.routes'

dotenv.config()

const app = express()

app.use(express.json())
app.use('/api/movies', movieRoute)


const PORT = process.env.PORT || 4000
connectDB()
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});