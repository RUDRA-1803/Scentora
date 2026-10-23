/**
 * 404 Not Found Middleware for undefined API endpoints
 */
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: `Endpoint not found: ${req.method} ${req.originalUrl}`,
    timestamp: new Date().toISOString(),
  });
};

export default notFoundHandler;
