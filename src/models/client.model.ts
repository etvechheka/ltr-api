import { error } from 'winston';
import db from '../config/connect.config';
import { Client } from '../schema/client.schema';

export const getAllClients = ( callback: any) => {
    const query = 'SELECT * FROM tbl_client_user';
    try {
       return db.query(query, callback) as any;
    } catch (error) {
        throw error;
    }
}

export const getClientByEmail = (email: string, callback: any) => {
    const query = 'SELECT * FROM tbl_client_user WHERE client_email=?';
    try {
       return db.query(query, [email], callback) as any;
    } catch (error) {
        throw error;
    }
}

export const signUp = (data: Client) => {
    const values = Object.values(data);
    const sql = 'INSERT INTO tbl_client_user (id, client_firstname, client_lastname, client_email, client_password, created_at, updated_at, status)VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, values, (err, result) => {
        if (err) throw err;
    });
}

export const getClientById = (clientId: string, callback: any) => {
    const query = 'SELECT * FROM tbl_client_user WHERE id = ?';
    try {
        return db.query(query, [clientId], callback);
    } catch (error) {
        throw error;
    }
}

export const updateClientById = (clientId: string, data: any, callback: any) => {
    const convertToArray = Object.values(data);
    const newData = [...convertToArray, clientId]
    try {
        const query = 'UPDATE tbl_client SET client_firstname=?, client_lastname=?, client_email=?, client_password=?, updated_at, status=? WHERE id=?';
        return db.query(query, newData, callback);
    } catch (error) {
        throw error
    }
}
