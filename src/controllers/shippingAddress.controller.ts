import { NextFunction, Request, Response } from "express";
import { getAddress, addNewAddress, updateAddressLine } from "../models/shippingAddress.model";

export const addShippingAddress = async (req: Request, res: Response, next: NextFunction) => {
    const { full_name, customer_id, phone_number, email_address, address_line, city, country, state, postal_code } = req.body;

    try {
        const data = {
            full_name: full_name,
            customer_id: customer_id,
            email_address: email_address,
            phone_number: phone_number,
            city: city,
            country: country,
            address_line: address_line,
            state: state,
            postal_code: postal_code
        }

        addNewAddress(data, (err, result) => {
            if (err) throw err;
            res.status(201).json({
                status: true,
                message: "Shipping address has been added",
            })
        });
    } catch (error) {
        next(error);
    }
}
export const getAddressByCustomerId = async (req: Request, res: Response, next: NextFunction) => {
    const customer_id = req.params.customer_id;
    try {
        getAddress(customer_id, (err: any, result: any) => {
            if (err) throw err;
            if (result.length !== 0) {
                return res.status(200).json({
                    status: true,
                    message: 'Data has fetched successfully',
                    result: result
                })
            }
            res.status(200).json({
                status: true,
                message: 'Data not found',
                result: []
            });
        });
    } catch (error) {
        next(error)
    }
}
export const updateAddress = async (req: Request, res: Response, next: NextFunction) => {
    const address_id = req.params.id;
    const { isSelect } = req.body;

    try {
        updateAddressLine({ id: address_id, isSelect }, (err: any, result: any) => {
            if (err) throw err;
            if (result.length == 0) {
                return res.status(204).json({
                    status: true,
                    message: 'Data not found',
                });
            }
            res.status(200).json({
                status: true,
                message: "Address has been updated"
            })
        });
    } catch (error) {
        next(error)
    }
}
