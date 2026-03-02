import db from '../config/connect.config';

export const addNewAddress = (data: any, callback: any) => {
    try {
        const newItems = Object.values(data);
        const sql = 'INSERT INTO tbl_shipping_address (full_name, customer_id, email_address, phone_number, city, country, address_line, state, postal_code)VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
        return db.query(sql, newItems, callback);
    } catch (error) {
        throw error;
    }
}
export const getAddress = (customer_id: any, callback: any) => {
    try {
        const sql = 'SELECT * FROM tbl_shipping_address WHERE customer_id=?';
        return db.query(sql, [customer_id], callback);
    } catch (error) {
        throw error;
    }
}
export const updateAddressLine = (data: any, callback: any) => {
    try {
        const sql = 'UPDATE tbl_shipping_address SET is_select=? WHERE id=?';
        return db.query(sql, [data.isSelect, data.id], callback);
    } catch (error) {
        throw error;
    }
}

