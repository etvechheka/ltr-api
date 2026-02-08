import { NextFunction, Request, Response } from "express";
import { getAllUsers, getUserById, updateUserById } from "../models/user.model";
import { User } from "../schema/userValid.schema";


export const getUsers = (req: Request, res: Response, next: NextFunction) => {

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

export const getUser = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
        getUserById(id as string, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.status(200).json({
                    status: true,
                    message: 'Data fetch successfully',
                    result: result[0]
                })
            }

            res.status(404).json({
                status: false,
                message: 'Data do not found'
            })
        })
    } catch (error) {
        next(error);
    }
}

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const {
        full_name, email, username, password, role, date_of_birth, status
    }: User = req.body;

    try {
        getUserById(id as string, (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                return res.status(404).json({
                    status: false,
                    message: 'Could not update this user'
                })
            }
            
            const newData = {
                full_name: full_name,
                username: username,
                email: email,
                date_of_birth: date_of_birth,
                password_hash: password,
                role: role,
                status: status
            }

            updateUserById(id as string, newData, (err, result) => {
                if(err) throw err;
                res.status(201).json({
                    status: true,
                    message: 'User has been updated',
                    result: newData
                })
            });
        })
    } catch (error) {
        next(error)
    }
}