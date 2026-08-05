import express from 'express';
import { getAmenities, createAmenity, updateAmenity, deleteAmenity } from '../controllers/amenityController.js';
import protect from '../middleware/authMiddleware.js';
import admin from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/').get(getAmenities).post(protect, admin, createAmenity);
router.route('/:id').put(protect, admin, updateAmenity).delete(protect, admin, deleteAmenity);

export default router;
