/**
 * Error carrying an HTTP status code, thrown from controllers and
 * translated into a JSON response by the centralized error handler.
 */
export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * Wraps an async Express handler so rejected promises reach the error handler.
 */
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * Standard success envelope used by every data endpoint.
 */
export const sendSuccess = (res, data, statusCode = 200) =>
  res.status(statusCode).json({ status: 'success', data });

export default ApiError;
