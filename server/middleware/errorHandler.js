/**
 * Centralized Error Handling Middleware for Express
 * Translates ApiError, Mongoose and JSON-parse errors into consistent JSON responses.
 */
const resolveError = (err, res) => {
  if (err.statusCode) return { statusCode: err.statusCode, message: err.message };

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((e) => e.message).join(' ');
    return { statusCode: 400, message };
  }
  if (err.name === 'CastError') {
    return { statusCode: 400, message: `Invalid value for ${err.path}.` };
  }
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return { statusCode: 409, message: `A record with this ${field} already exists.` };
  }
  if (err.type === 'entity.parse.failed') {
    return { statusCode: 400, message: 'Malformed JSON request body.' };
  }

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  return { statusCode, message: err.message || 'Internal Server Error' };
};

export const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = resolveError(err, res);

  if (statusCode >= 500) {
    console.error(`❌ [Error ${statusCode}] ${req.method} ${req.originalUrl}:`, err.message);
    if (process.env.NODE_ENV !== 'production' && err.stack) {
      console.error(err.stack);
    }
  }

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV !== 'production' && statusCode >= 500 && { stack: err.stack }),
    timestamp: new Date().toISOString(),
  });
};

export default errorHandler;
