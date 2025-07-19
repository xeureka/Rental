import { Request, Response } from 'express';
import { Movies } from '../models/movie.model';
import { Reservation } from '../models/reservatioin.model';

export const getMoviesByDate = async (req: Request, res: Response) => {
  const date = new Date(req.params.date);
  const movies = await Movies.find({ "showtimes.date": date });
  res.json(movies);
};

export const reservedSeats = async (req: Request, res: Response) =>{
    const { movieId, showtimeId, userId, seats } = req.body;

    const movie = await Movies.findById(movieId);
    const showtime = movie?.showtimes.id(showtimeId)

    if (!movie || !showtime){
        return res.status(400).json({message: 'Not Found !'})
    }
    const alreadyReserved = seats.some((seat: string) => showtime.reservedSeats.includes(seat))

    if (alreadyReserved){
        return res.status(400).json({message: 'Seat already taken'})
    }
    showtime.reservedSeats.push(...seats);
    await movie.save()

    const reservation = await Reservation.create({movieId,showtimeId,userId,seats});
    res.status(201).json(reservation)
}

export const getUserReservations = async (req: Request, res: Response) =>{
    const userId = req.params.userId;
    const reservations = await Reservation.find({userId})
    res.json(reservations)
}

export const cancelReservation = async (req: Request, res: Response) =>{
    const reservation =await Reservation.findById(req.params.reservationId)
    if (!reservation){
        return res.status(404).json({message: 'Not Found'})
    }
    const movie = await Movies.findById(reservation.movieId)
    if (!reservation.showtimeId) {
        return res.status(400).json({ message: 'Missing showtimeId in reservation' });
    }

    const showtime = movie?.showtimes.id(reservation.showtimeId);

    showtime?.reservedSeats?.filter((seat: string) => !reservation.seats.includes(seat))
    await movie?.save()

    await Reservation.findByIdAndDelete(reservation._id);
    res.status(204).json()
}

export const getAdminStats = async (_req: Request, res: Response) =>{
    const reservations = await Reservation.find()
    const total = reservations.length;
    const revenue = total *10;
    res.json({totalResrvation: total, revenue})
}