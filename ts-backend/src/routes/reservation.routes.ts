import express from 'express';
import {
  getMoviesByDate,
  reserveSeats,
  getUserReservations,
  cancelReservation,
  getAdminStats
} from '../controllers/reservation.controller';

const router = express.Router();

router.get('/date/:date', getMoviesByDate);
router.post('/reserve', reserveSeats);
router.get('/user/:userId', getUserReservations);
router.delete('/:reservationId', cancelReservation);
router.get('/admin/stats', getAdminStats);

export default router;