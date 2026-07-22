import { Router } from 'express';

import healthRoutes from './health.routes.js';
import pagesRoutes from './pages.routes.js';

const router = Router();

router.use(healthRoutes);
router.use(pagesRoutes);

export default router;