import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import authRoutes from './authRoutes.js';
import productRoutes from './productRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import orderRoutes from './orderRoutes.js';
import accountRoutes from './accountRoutes.js';
import adminRoutes from './adminRoutes.js';
import storeRoutes from './storeRoutes.js';
import { requireDb } from '../middleware/requireDb.js';

const apiRouter = Router();

// Mount health routes at /api/health (available even when MongoDB is down)
apiRouter.use('/health', healthRoutes);

// Everything below needs the database
apiRouter.use(requireDb);
apiRouter.use('/auth', authRoutes);
apiRouter.use('/products', productRoutes);
apiRouter.use('/categories', categoryRoutes);
apiRouter.use('/orders', orderRoutes);
apiRouter.use('/account', accountRoutes);
apiRouter.use('/admin', adminRoutes);
apiRouter.use('/', storeRoutes);

export default apiRouter;
