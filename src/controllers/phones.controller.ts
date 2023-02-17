import { NextFunction, Request, Response } from 'express';
import {createPhone, getAllPhones} from "../services/phone.service";

export const getAllPhonesHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const phones = await getAllPhones();

        res
            .status(200)
            .status(200)
            .json({
                status: "success",
                body: phones
            });
    } catch (err: any) {
        next(err);
    }
};

export const createPhoneHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await createPhone(req.body);
        res
            .status(201)
    } catch (err: any) {
        next(err);
    }
};
