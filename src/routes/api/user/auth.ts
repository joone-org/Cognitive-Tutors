import { Request, Router } from "express";
import { validationWrapper } from "../../../helpers/util";
import { authServiceInstance, userServiceInstance } from "../../../services";
import validate from "../../../helpers/validate";
import middlewares from "../../../middlewares";

const router = Router();

router.post('/login', validationWrapper(validate.user.auth.login), async (req, res) => {
    try {
        const { username, password } = req.body;
        const { token } = await authServiceInstance.userSignIn(username, password);

        res.cookie('token', token, { httpOnly: true, secure: true });

        return res.status(200).json({
            status: 'ok',
            token: token
        })

    } catch (e) {
        console.log(e)
        res.sendStatus(403)
    }
});

router.post('/register', middlewares.user.isAuth, validationWrapper(validate.user.auth.register), async (req, res) => {
    try {
        delete req.body.oldPassword;
        await authServiceInstance.userSignUp(req.body);
        res.status(200).json({
            status: 'ok'
        })
    } catch (e) {
        console.log(e)
        res.status(500).send();
    }
})

router.get('/me', middlewares.user.isAuth, async (req: Request, res) => {
    try {
        const user = await userServiceInstance.getUserById(req.currentUser.id)
        return res.json(user)
    } catch (err) {
        return res.status(500)
    }
})

export default router;