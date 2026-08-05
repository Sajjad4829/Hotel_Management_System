import jwt from 'jsonwebtoken';

/**
 * Generate a JWT token containing User ID, Email, and Role.
 * Expires in 30 days.
 */
const generateToken = (id, email, role) => {
  return jwt.sign(
    { id, email, role },
    process.env.JWT_SECRET || 'fallback_secret_key',
    { expiresIn: '30d' }
  );
};

export default generateToken;
