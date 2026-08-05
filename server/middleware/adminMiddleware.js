/**
 * Middleware to restrict route access exclusively to users with 'admin' role.
 * Must be executed after authMiddleware (protect).
 */
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied: Normal User cannot access Admin Dashboard resources.',
    });
  }
};

export default admin;
