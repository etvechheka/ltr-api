import { NextFunction, Request, Response } from "express";
import { addOrder, getOrders } from "../models/order.model";

export const orderItem = async (req: Request, res: Response, next: NextFunction) => {
    const {order_id, customer_uuid, list_items, status, total_price} = req.body;

    try {
        const orderItems = {
            order_id: order_id,
            customer_id: customer_uuid,
            ordered_date: new Date(),
            list_item: list_items,
            order_status: status,
            total_price: total_price
        }

        addOrder(orderItems, (err, result) => {
            if(err) throw err;
            res.status(201).json({
                status: true,
                message: "Item has been ordered",
            })
        });
    } catch (error) {
        next(error);
    }
}

export const getOrderLists = async (req: Request, res: Response, next: NextFunction) => {

    try {
        getOrders((err: any, result: any) => {
            if(err) throw err;
            if(result.length !== 0) {
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
            })
        })
    } catch (error) {
        next(error)
    }
}