import { NextFunction, Request, Response } from "express";
import { createContact } from "../models/support.model";

export const AddContact = (req: Request, res: Response, next: NextFunction) => {
    const { first_name, last_name, phone, email, company, comment } = req.body;
    const data = {
        first_name,
        last_name,
        email,
        phone,
        company,
        comment
    }

    try {
        createContact(data, (err, result) => {
            if (err) throw err;
            res.status(201).json({
                status: true,
                message: 'Data has been added'
            });
        });
    } catch (error) {
        next(error)
    }
}
