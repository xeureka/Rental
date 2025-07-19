import express from 'express'

import { getAllMovies,createMovie,updateMovie,deleteMovie } from '../controllers/movie.controller'

const router = express.Router()

router.get('/', getAllMovies)
router.post('/', createMovie)
router.put('/:id', updateMovie)
router.delete('/:id', deleteMovie)


export default router