import express from 'express';
import { register, login, getProfile, logout, updateProfile, changePassword } from '../controllers/authController.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

// Public Routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Protected Routes (Required JWT via Authorization Bearer header)
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.put('/password', authenticate, changePassword);

// Alias route to maintain backward compatibility with existing frontend session persistence checks
router.get('/me', authenticate, getProfile);

export default router;
