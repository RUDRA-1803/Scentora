import { getDbStatus } from '../config/db.js';

/**
 * Health check controller
 * Endpoint: GET /api/health
 * Returns service status, system uptime, and database connectivity details
 */
export const getHealth = (req, res) => {
  const dbStatus = getDbStatus();

  res.status(200).json({
    status: 'ok',
    message: 'Scentora API is running successfully',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    database: {
      status: dbStatus.status,
      message: dbStatus.message,
    },
  });
};
