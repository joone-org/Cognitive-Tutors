import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { nanoid } from "nanoid";

export function validationWrapper(validationSchema: Joi.ObjectSchema<any>, gotoNext = true) {
    return (req: Request, res: Response, next: NextFunction) => {
        const validation = validationSchema.validate(req.body);
        if (validation.error) {
            return res.status(400).json(validation.error)
        } else {
            if (gotoNext) next();
        }
    }
}

export function generateId() {
    return nanoid(10);
}

export function generateLongId(n: number) {
    return nanoid(n);
}