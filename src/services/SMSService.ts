import { Service } from "typedi";
import { NextFunction, Request, Response } from "express";
import MessagingResponse from "twilio/lib/twiml/MessagingResponse";
import { chatServiceInstance, userServiceInstance, walletServiceInstance } from ".";

@Service()
export class SMSService {

    public async handleIncomingRequest(req: Request, res: Response, next: NextFunction) {
        try {

            const from = req.body['From'] || req.body['from'];
            // const to = req.body['To'] || req.body['to'];
            const body = req.body['Body'] || req.body['body'];

            const user = await userServiceInstance.getOrCreateUserSMS(from);
            const userChat = await chatServiceInstance.getOrCreateUserChatByUserId(user.id, 'SMS');
            try {
                const chat = await chatServiceInstance.sendPrompt(userChat.id, [{
                    content: body,
                    role: 'user'
                }]);

                const message = new MessagingResponse();
                message.message(chat.content);

                res.set("Content-Type", "text/xml");
                return res.send(message.toString());


            } catch (err) {
                const paymentUrl = await walletServiceInstance.generatePayment(user.walletId);

                const message = new MessagingResponse();
                message.message("Your balance is running a little low. Please recharge at: " + paymentUrl);

                res.set("Content-Type", "text/xml");
                return res.send(message.toString());
            }
        } catch (err) {
            console.log(err)
            return res.sendStatus(500)
        }
    }


}