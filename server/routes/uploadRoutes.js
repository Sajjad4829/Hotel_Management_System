import express from 'express';
import { uploadImages, deleteImage } from '../controllers/uploadController.js';
import { upload } from '../config/cloudinary.js';
import protect from '../middleware/authMiddleware.js';
import admin from '../middleware/adminMiddleware.js';

const router = express.Router();

// Support both single file and up to 10 multiple files in array under field 'images' or 'image'
router.post('/', protect, admin, upload.any(), uploadImages);
router.delete('/', protect, admin, deleteImage);

export default router;
