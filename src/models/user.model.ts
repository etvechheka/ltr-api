import { error } from 'winston';
import db from '../config/connect.config';

export const getAllUsers = ( callback: any) => {
    const query = 'SELECT * FROM tbl_user';
    try {
       return db.query(query, callback) as any;
    } catch (error) {
        throw error;
    }
}

export const getUserById = (userId: string, callback: any) => {
    const query = 'SELECT * FROM tbl_user WHERE id = ?';
    try {
        return db.query(query, [userId], callback);
    } catch (error) {
        throw error;
    }
}

export const updateUserById = (userId: string, data: any, callback: any) => {
    const convertToArray = Object.values(data);
    const newData = [...convertToArray, userId]
    try {
        const query = 'UPDATE tbl_user SET full_name=?, username=?, email=?, date_of_birth=?, password_hash=?, role=?, status=? WHERE id=?';
        return db.query(query, newData, callback);
    } catch (error) {
        
    }
}
