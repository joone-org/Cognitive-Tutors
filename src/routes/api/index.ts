import { Router } from "express";
import twilio from 'twilio';

import userRouter from './user';
import config from "../../config";
import { smsServiceInstance } from "../../services";

const router = Router();

router.use('/user', userRouter);
router.post('/twilio', twilio.webhook(config.twilio.authToken), smsServiceInstance.handleIncomingRequest)

export default router;