import express from 'express';
import {
  createBooking,
  getMyBookings,
  getAllBookings,
  getBookingById,
  cancelBooking,
} from '../controllers/bookingController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// ============================================================================
// Phase 6 Booking Backend APIs
// All routes are strictly protected by JWT authentication middleware (protect)
// ============================================================================

// @route   POST /api/bookings/create
// @desc    Create new room booking with inventory availability check & reduction
router.post('/create', protect, createBooking);

// @route   GET /api/bookings/my-bookings
// @desc    Retrieve all booking reservations belonging to authenticated customer
router.get('/my-bookings', protect, getMyBookings);

// @route   GET /api/bookings/all
// @desc    Retrieve all reservations system-wide with payment records for Admin
router.get('/all', protect, getAllBookings);

// @route   GET /api/bookings/:id
// @desc    Retrieve detailed reservation info by ID or bookingId
router.get('/:id', protect, getBookingById);

// @route   PUT /api/bookings/cancel/:id
// @desc    Cancel existing booking and restore room inventory quantity
router.put('/cancel/:id', protect, cancelBooking);

export default router;
