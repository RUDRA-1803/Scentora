import { Router } from 'express';
import healthRoutes from './healthRoutes.js';

const apiRouter = Router();

// Mount health routes at /api/health
apiRouter.use('/health', healthRoutes);

export default apiRouter;
