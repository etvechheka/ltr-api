import { error } from 'winston';
import db from '../config/connect.config';
import { User } from '../schema/userValid.schema';

export const getUserByUsername = (username: string, callback: any) => {
    const query = 'SELECT * FROM tbl_user WHERE username=?';
    try {
       return db.query(query, [username], callback) as any;
    } catch (error) {
        throw error;
    }
}

export const createUser = (data: User) => {
    const values = Object.values(data);
    const sql = 'INSERT INTO tbl_user (id, full_name, email,role, password_hash, username, date_of_birth, created_at, status)VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, values, (err, result) => {
        if (err) throw err;
    });
}