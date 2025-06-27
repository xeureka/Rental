
import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './utils/db.connect'
import movieRoutes from './routes/movie.routes';
import reservationRoutes from './routes/reservation.routes';
dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use('/api/movies', movieRoutes);
// app.use('/api/reservations', reservationRoutes);

connectDB()
app.listen(PORT, () =>{
    console.log(`Server runnin on port ${PORT}`)
})