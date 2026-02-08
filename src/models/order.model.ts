import db from '../config/connect.config';

export const addOrder = (items: any, callback: any) => {
    try {
        const newItems = Object.values(items);
        const sql = 'INSERT INTO tbl_order (order_id, customer_id, ordered_date, items, status, total_price) VALUES(?, ?, ?, ?, ?, ?)';
        return db.query(sql, newItems, callback);
    } catch (error) {
        throw error;
    }
}

export const getOrders = (callback: any) => {
    try {
        const sql = 'SELECT * FROM tbl_order';
        return db.query(sql, callback);
    } catch (error) {
        throw error;
    }
}