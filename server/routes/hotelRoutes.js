import express from 'express';
import { getHotels, getHotelById, createHotel, updateHotel, deleteHotel } from '../controllers/hotelController.js';
import protect from '../middleware/authMiddleware.js';
import admin from '../middleware/adminMiddleware.js';

const router = express.Router();

// Public read access for customers and guests browsing properties
router.route('/').get(getHotels);
router.route('/:id').get(getHotelById);

// Protected admin exclusive mutation endpoints
router.route('/').post(protect, admin, createHotel);
router.route('/:id').put(protect, admin, updateHotel).delete(protect, admin, deleteHotel);

export default router;
