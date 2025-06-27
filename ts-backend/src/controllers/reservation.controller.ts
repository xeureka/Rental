import { Request, Response } from 'express';
import { Movies } from '../models/movie.model';
import { Reservations } from '../models/reservation.model';

export const getMoviesByDate = async (req: Request, res: Response) => {
  const date = new Date(req.params.date);
  const movies = await Movies.find({'showtimes.date': date})
  res.json(movies)
}

export const reserveSeats = async (req: Request, res: Response) =>{
  const { movieId,showtimeId, userId,seats} = req.body;
  const movie = await Movies.findById(movieId);
  const showtime = movie?.showtimes.id(showtimeId)

  if (!movie || !showtime){
    res.status(400).json({message: 'Not Found !!'})
    return;
  }

  const alreadyReserved = seats.some((seat: string) => showtime.reservedSeats.includes(seat))

  if (alreadyReserved){
    res.status(400).json({message: 'seat already taken'})
    return;
  }
  showtime.reservedSeats.push(...seats);
  await movie.save()

  const reservation = await Reservations.create({movieId,showtimeId,userId,seats})
  res.status(201).json(reservation)
}

// admins to see reservation history
export const getUserReservations = async (req: Request,res: Response) => {
    const userId = req.params.userId;
    const reservations = await Reservations.find({userId});
    res.json(reservations)
}

// users to cancel upcoming reservations
export const cancelReservation = async (req: Request, res: Response) =>{
  const reservation = await Reservations.findById(req.params.reservationId);
  if (!reservation){
    res.status(404).json({message: 'Not found'});
    return;
  }

  const movie = await Movies.findById(reservation.movieId);
  const showtime = movie?.showtimes.id(reservation.showtimeId);

  showtime?.reservedSeats?.filter((seat: string) => !reservation.seats.includes(seat))
  await movie?.save()

  await Reservations.findByIdAndDelete(reservation._id)
  res.status(204).json()
}

// admins views reservation count and revenue
export const getAdminStats = async (_req: Request,res: Response) =>{
  const reservations = await Reservations.find()
  const total = reservations.length;
  const revenue = total * 300 // if 300 per ticket
  res.json({totalReservations: total, revenue})
}
