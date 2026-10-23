import User, { MIN_PASSWORD_LENGTH } from '../models/User.js';
import { signToken } from '../middleware/auth.js';
import { ApiError, asyncHandler, sendSuccess } from '../utils/apiError.js';

const authPayload = (user) => ({ token: signToken(user), user: user.toJSON() });

const authenticate = async (email, password) => {
  if (!email || !password) throw new ApiError(400, 'Email and password are required.');

  const user = await User.findOne({ email: String(email).toLowerCase().trim() }).select('+passwordHash');
  if (!user || !(await user.verifyPassword(password))) {
    throw new ApiError(401, 'Invalid email or password.');
  }
  return user;
};

/**
 * POST /api/auth/register
 */
export const register = asyncHandler(async (req, res) => {
  const { fullName, name, email, password, phone } = req.body;

  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    throw new ApiError(400, `Password must contain at least ${MIN_PASSWORD_LENGTH} characters.`);
  }
  if (email && (await User.exists({ email: String(email).toLowerCase().trim() }))) {
    throw new ApiError(409, 'An account with this email already exists. Please sign in.');
  }

  const user = new User({ name: fullName || name, email, phone });
  await user.setPassword(password);
  await user.save();

  sendSuccess(res, authPayload(user), 201);
});

/**
 * POST /api/auth/login
 */
export const login = asyncHandler(async (req, res) => {
  const user = await authenticate(req.body.email, req.body.password);
  sendSuccess(res, authPayload(user));
});

/**
 * POST /api/auth/admin/login — same as login but only admits administrators.
 */
export const adminLogin = asyncHandler(async (req, res) => {
  const user = await authenticate(req.body.email, req.body.password);
  if (user.role !== 'admin') throw new ApiError(403, 'This account does not have administrator access.');
  sendSuccess(res, authPayload(user));
});

/**
 * GET /api/auth/me
 */
export const getMe = (req, res) => sendSuccess(res, req.user.toJSON());
