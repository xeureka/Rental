
import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './utils/db.connect'
import UsersRouter from './routes/users.router'
import MovieRouter from './routes/movie.router'
import GenreRouter from './routes/genre.router'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use('/api/users',UsersRouter);  // admin protected route
app.use('/api/movies',MovieRouter)
app.use('/api/genre',GenreRouter)

app.get('/',(req,res) => {
    res.send('Hello World')
})


connectDB()
app.listen(PORT, () =>{
    console.log(`Server runnin on port ${PORT}`)
})

