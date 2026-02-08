import { NextFunction, Request, Response } from "express";
import { getAllUsers, getUserById, updateUserById } from "../models/user.model";

export const sendInquiry = (req: Request, res: Response, next: NextFunction) => {

    try {
        getAllUsers((err, result) => {
            if (err) throw err;
            if (result) { 
                return res.status(200).json({
                    status: true,
                    message: 'Data has been fetch successfully',
                    result: result
                })
            }
            res.status(404).json({
                status: false,
                message: 'Data do not found'
            })
        });
    } catch (error) {
        next(error)
    }
}
