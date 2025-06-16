

import express, {Request, Response} from 'express'
import Movies from '../models/movies.model'
import { Genres } from '../models/genres.model'

const router = express.Router()

// POST TO ADD THE MOVIES
router.post('/', async (req,res) => {
    try {

        const genre:any = await Genres.findById(req.body.genreId);

        if (!genre){
             res.status(201).json('The Genre is Not Found please add it before the movie.')
        }

        let newMovie = new Movies({
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            description: req.body.description,
            posterImage: req.body.posterImage,
            showTime: req.body.showTime

        })

        const result = await newMovie.save()
        res.send(result)
        
    } catch (error) {
        console.log('Error Adding a Movie, ',error);
    }
})


router.get('/', async (req,res) => {
    res.json('This is list of movies')
})



export default router;
