import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './utils/db.connect'
import movieRoute from './routes/movie.routes'
import reservationRoute from './routes/reservation.routes';


dotenv.config()

const app = express()

app.use(express.json())
app.use('/api/movies', movieRoute)
app.use('/api/reservations', reservationRoute);



const PORT = process.env.PORT || 4000
connectDB()
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});