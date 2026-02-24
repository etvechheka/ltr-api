import { NextFunction, Request, Response } from "express";
import { getAllClients, getClientByEmail, getClientById, signUp, updateClientById } from "../models/client.model";
import uuid from 'uuid';
import { comparedPassword, encryptPassword } from "../utils/encrypt";
import { Client, ClientLoggin } from "../schema/client.schema";
import { generateToken } from "../utils/jwtToken";




export const createClient = async (req: Request, res: Response, next: NextFunction) => {
    const {
        firstname, lastname, email, password
    }: Client = req.body;

    try {
        getClientByEmail(email as string, async (err, result) => {
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
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: passwordHash,
                    created_at: new Date(),
                    updated_at: new Date(),
                    status: 'active'
                }
                signUp(data);
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

export const getClients = (req: Request, res: Response, next: NextFunction) => {

    try {
        getAllClients((err, result) => {
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
        next(error);
    }
}

export const getClient = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
        getClientById(id as string, (err, result) => {
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

export const updateClient = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const {
        firstname, lastname, email, password, status, address, phone
    } = req.body;

    try {
        getClientById(id as string, async (err, result1) => {
            if (err) throw err;
            if (result1.length == 0) {
                return res.status(404).json({
                    status: false,
                    message: 'Could not update this client'
                })
            }
            const passwordHash = password !== '' ? await encryptPassword(password) : result1[0].client_password;
            const newData = {
                client_firstname: firstname,
                client_lastname: lastname,
                client_email: email,
                client_password: passwordHash,
                updated_at: new Date(),
                status: status,
                client_address: address,
                client_phone: phone,
                id: result1[0].id
            }
            
            updateClientById(newData, (err, result) => {
                if (err) throw err;
                
                res.status(201).json({
                    status: true,
                    message: 'Client has been updated',
                    result: newData
                });
            });
        });
    } catch (error) {
        next(error);
    }
}


export const loginClient = async (req: Request, res: Response, next: NextFunction) => {
    const { client_username, client_password }: ClientLoggin = req.body;
    try {
        getClientByEmail(client_username, async (err, result) => {
            if (err) throw err;
            if (result.length !== 0) {

                const user = result[0];
                const paired = await comparedPassword(user.client_password, client_password);
                const accessToken = generateToken({ id: user.id, username: user.client_email, role: 'customer' });

                if (paired) {
                    return res.status(200).json({
                        status: true,
                        message: 'Login successfully',
                        user: user,
                        _token: accessToken
                    })
                }
            } else {
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
