// authRoutes.ts

import express from 'express';
import { Servicecontroller } from '../controllers/ServiceController';

const router = express.Router();

// Respond with all available Routes
router.all('/', Servicecontroller.getServices);

// Sign in with Apple

export default router;