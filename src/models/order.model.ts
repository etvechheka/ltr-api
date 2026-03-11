import db from '../config/connect.config';

export const addOrder = (items: any) => {
    try {
        const newItems = Object.values(items);
        const sql = 'INSERT INTO tbl_order (order_id, customer_id, ordered_date, items, status, total_price) VALUES(?, ?, ?, ?, ?, ?)';
        return db.query(sql, newItems);
    } catch (error) {
        throw error;
    }
}

export const getOrders = async () => {
    try {
        const sql = 'SELECT * FROM tbl_order';
        const [rows] = await db.query(sql);
        return rows;
    } catch (error) {
        throw error;
    }
}