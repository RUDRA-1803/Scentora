/**
 * Centralized Error Handling Middleware for Express
 */
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  console.error(`❌ [Error ${statusCode}] ${req.method} ${req.originalUrl}:`, err.message);
  if (process.env.NODE_ENV !== 'production' && err.stack) {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    timestamp: new Date().toISOString(),
  });
};

export default errorHandler;
