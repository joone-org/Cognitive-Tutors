import { Router } from "express";
import twilio from 'twilio';

import userRouter from './user';
import config from "../../config";
import { smsServiceInstance } from "../../services";

const router = Router();

router.use('/user', userRouter);
router.post('/twilio', twilio.webhook(config.twilio.authToken), smsServiceInstance.handleIncomingRequest)
router.get('/test', async (req, res, next) => {
    req.body = {
        From: '+251930109645',
        Body: req.query.prompt
    }
    next();
}, smsServiceInstance.handleIncomingRequest)

export default router;