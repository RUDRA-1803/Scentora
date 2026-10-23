import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { ApiError, asyncHandler } from '../utils/apiError.js';

const readToken = (req) => {
  const header = req.headers.authorization || '';
  return header.startsWith('Bearer ') ? header.slice(7) : null;
};

const resolveUser = async (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return await User.findById(payload.sub);
  } catch {
    return null;
  }
};

/**
 * Requires a valid JWT. Attaches the user document to req.user.
 */
export const protect = asyncHandler(async (req, res, next) => {
  const token = readToken(req);
  if (!token) throw new ApiError(401, 'Authentication required. Please sign in.');

  const user = await resolveUser(token);
  if (!user) throw new ApiError(401, 'Your session has expired. Please sign in again.');

  req.user = user;
  next();
});

/**
 * Attaches req.user when a valid token is present, but never rejects.
 * Used for endpoints that also serve guests (e.g. guest checkout).
 */
export const optionalAuth = asyncHandler(async (req, res, next) => {
  const token = readToken(req);
  if (token) req.user = await resolveUser(token);
  next();
});

/**
 * Must run after `protect`. Restricts the route to administrators.
 */
export const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return next(new ApiError(403, 'Administrator access required.'));
  }
  next();
};

export const signToken = (user) =>
  jwt.sign({ sub: String(user._id), role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
