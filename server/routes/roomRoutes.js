import express from 'express';
import { getRooms, getRoomById, createRoom, updateRoom, deleteRoom } from '../controllers/roomController.js';
import protect from '../middleware/authMiddleware.js';
import admin from '../middleware/adminMiddleware.js';

const router = express.Router();

// Public guest access for booking searches and viewings
router.route('/').get(getRooms);
router.route('/:id').get(getRoomById);

// Protected Admin management routes
router.route('/').post(protect, admin, createRoom);
router.route('/:id').put(protect, admin, updateRoom).delete(protect, admin, deleteRoom);

export default router;
