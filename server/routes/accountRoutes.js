import { Router } from 'express';
import {
  updateProfile,
  getCart,
  replaceCart,
  getWishlist,
  replaceWishlist,
} from '../controllers/accountController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);
router.put('/profile', updateProfile);
router.get('/cart', getCart);
router.put('/cart', replaceCart);
router.get('/wishlist', getWishlist);
router.put('/wishlist', replaceWishlist);

export default router;
