import mongoose from 'mongoose';

/**
 * Fails fast with 503 when MongoDB is unavailable, instead of letting
 * Mongoose buffer queries until they time out.
 */
export const requireDb = (req, res, next) => {
  if (mongoose.connection.readyState === 1) return next();
  res.status(503).json({
    status: 'error',
    message: 'Database is unavailable. Please try again shortly.',
    timestamp: new Date().toISOString(),
  });
};

export default requireDb;
