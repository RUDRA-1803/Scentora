import { Router } from 'express';
import { listCustomers, listInquiries, resetCatalogue } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();

router.use(protect, adminOnly);
router.get('/customers', listCustomers);
router.get('/inquiries', listInquiries);
router.post('/reset-catalogue', resetCatalogue);

export default router;
