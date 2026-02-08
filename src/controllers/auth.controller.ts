import { Request, Response, NextFunction } from "express";
import { LoginUser, User } from "../schema/userValid.schema";
import { getUserByUsername, createUser } from "../models/auth.model";
import uuid from 'uuid';
import { comparedPassword, encryptPassword } from "../utils/encrypt";
import { generateToken } from "../utils/jwtToken";



export const create = async (req: Request, res: Response, next: NextFunction) => {
    const {
        full_name, email, username, password, role, date_of_birth, status
    }: User = req.body;

    try {
        getUserByUsername(username as string, async (err, result) => {
            if (err) throw err;
            if (result.length !== 0) {
                return res.status(400).json({
                    status: false,
                    message: 'User already exist'
                })
            } else {
                const id = uuid.v4();
                const passwordHash = await encryptPassword(password);
                const data: any = {
                    id: id,
                    full_name: full_name,
                    email: email,
                    username: username,
                    password_hash: passwordHash,
                    role: role,
                    date_of_birth: date_of_birth,
                    created_at: new Date(),
                    status: status
                }
                createUser(data);
                res.status(201).json({
                    status: true,
                    message: 'Data has been inserted',
                    result: data
                });
            }
        });

    } catch (error) {
        next(error);
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password }: LoginUser = req.body;
    try {
        getUserByUsername(username, async (err, result) => {
            if (err) throw err;
            if (result) {
                const user = result[0];
                const paired = await comparedPassword(user.password_hash, password);
                const accessToken = generateToken({id: user.id, username: user.username, role: user.role});
                
                if(paired) {

                    return res.status(200).json({
                        status: true,
                        message: 'Login successfully',
                        user: user,
                        _token: accessToken
                    })
                }
            }else{
                res.status(405).json({
                    status: false,
                    message: 'User does not exist'
                })
            }
            
        });

    } catch (error) {
        next(error)
    }
}
