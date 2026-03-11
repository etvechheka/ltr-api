import db from '../config/connect.config';

export const addNewAddress = (data: any) => {
    try {
        const newItems = Object.values(data);
        const sql = 'INSERT INTO tbl_shipping_address (full_name, customer_id, email_address, phone_number, city, country, address_line, state, postal_code)VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, newItems);
    } catch (error) {
        throw error;
    }
}
export const getAddress = async (customer_id: any, callback: any) => {
    try {
        const sql = 'SELECT * FROM tbl_shipping_address WHERE customer_id=?';
        const [rows] = await db.query(sql, [customer_id]);
        return rows;
    } catch (error) {
        throw error;
    }
}
export const updateAddressLine = (data: any) => {
    try {
        const sql = 'UPDATE tbl_shipping_address SET is_select=? WHERE id=?';
        db.query(sql, [data.isSelect, data.id]);
    } catch (error) {
        throw error;
    }
}

