import express from 'express';
import {
  reserveSeats,
  getMoviesByDate,
  getUserReservations,
  cancelReservation,
  getAdminStats
} from '../controllers/reservation.controller';

const router = express.Router();

router.post('/reserve', reserveSeats);         
router.get('/date/:date', getMoviesByDate);
router.get('/user/:userId', getUserReservations);
router.delete('/:reservationId', cancelReservation);
router.get('/admin/stats', getAdminStats);

export default router;
