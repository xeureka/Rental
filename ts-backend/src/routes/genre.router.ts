import express, { Request, Response } from 'express';
import { Genres } from '../models/genres.model';

const router = express.Router();

// POST TO ADD GENRE

router.post('/', async (req, res) => {
    try {
        const genreName: any = req.body.name;

        const isGenreExist: any = await Genres.find({ name: genreName });

        if (isGenreExist.length > 0) {
            return res.status(400).json({ message: 'Genre Already Exists' });
        }

        const newGenre = new Genres({ name: genreName });
        const result = await newGenre.save();

        return res.status(201).json(result);

    } catch (error) {
        console.error('Error creating a Genre:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
