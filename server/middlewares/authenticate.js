import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Authentication Middleware
 * Reads JWT from Authorization header (Bearer <token>), verifies signature,
 * and attaches authenticated user profile to req.user.
 */
export const authenticate = async (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from string: "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];

      // Verify JWT signature using secret key
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'hotel_management_super_secret_jwt_key_2026'
      );

      // Fetch user from database excluding password and attach to request
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authorization failed: User account no longer exists in system.',
        });
      }

      next();
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Authorization failed: Token is invalid or expired.',
      });
    }
  }

  // If no token found in header
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access Denied: No authentication token provided in request header.',
    });
  }
};

export default authenticate;
