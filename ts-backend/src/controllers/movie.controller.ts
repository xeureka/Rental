import { Request, Response} from 'express'
import { Movies } from '../models/movie.model'

export const getAllMovies = async (_req: Request, res: Response) => {
    const movies = await Movies.find()
    res.json(movies)
}

export const createMovie = async (req: Request, res: Response) => {
    const movie = await Movies.create(req.body)
    res.json(movie)
    // needs zod validation here
}

export const updateMovie = async (req: Request,res: Response) =>{
    const movie = await Movies.findByIdAndUpdate(req.params.id, req.body,{new: true});
    res.json(movie)
}


export const deleteMovie = async (req: Request, res: Response) => {
    await Movies.findByIdAndDelete(req.params.id)
    res.status(204).json()
}