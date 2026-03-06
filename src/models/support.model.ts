import db from '../config/connect.config';

export const createContact = (data: any, callback: any) => {
    try {
        const newItems = Object.values(data);
        const sql = 'INSERT INTO tbl_contact (first_name, last_name, email_address, phone_number, company, comment)VALUES(?, ?, ?, ?,  ?, ?)';
        return db.query(sql, newItems, callback);
    } catch (error) {
        throw error;
    }
}