import { NextFunction, Request, Response } from "express";
import { authServiceInstance } from "../services";

const getTokenFromCookies = (req: Request) => {
    if (req.cookies && req.cookies.token) {
        return req.cookies.token
    } else if (req.headers && req.headers.authorization) {
        return req.headers.authorization
    }
    return null;
}

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const token = getTokenFromCookies(req);
        const user = authServiceInstance.verifyToken(token);

        req.token = user;

        next();

    } catch (e) {
        if ((<Error>e).message == '401') {
            return res.status(401).json({
                status: 'error',
                message: 'JWT Token Expired'
            })
        }
        return res.status(403).json({
            error: 'Unauthorized Access'
        })
    }
}

export default checkAuth;
