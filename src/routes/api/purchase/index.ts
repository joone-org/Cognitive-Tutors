import { Router } from "express";
import { walletServiceInstance } from "../../../services";

const router = Router();

router.get("/confirm", async (req, res) => {
    try {
        const id = req.query.id;
        await walletServiceInstance.confirmPayment(id as string);

        return res.json({
            status: 'ok'
        })
    } catch (err) {
        return res.sendStatus(500)
    }
})

router.get("/cancel", async (req, res) => {
    try {
        const id = req.query.id;
        await walletServiceInstance.cancelPayment(id as string);

        return res.json({
            status: 'ok'
        })
    } catch (err) {
        return res.sendStatus(500)
    }
})

export default router;