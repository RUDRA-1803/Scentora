import { Router } from 'express';
import { validateCoupon, submitInquiry, subscribeNewsletter } from '../controllers/storeController.js';

const router = Router();

router.post('/coupons/validate', validateCoupon);
router.post('/contact', submitInquiry);
router.post('/newsletter', subscribeNewsletter);

export default router;
