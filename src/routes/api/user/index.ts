import { Router } from "express";

import authRouter from './auth';
import chatRouter from './chat';
import meRouter from './me';

const router = Router();

router.use('/auth', authRouter);
router.use('/chat', chatRouter);
router.use('/me', meRouter);

export default router;