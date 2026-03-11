import { error } from 'winston';
import db from '../config/connect.config';
import { Client } from '../schema/client.schema';

export const getAllClients = async () => {
    const query = 'SELECT * FROM tbl_client_user';
    try {
        const [rows] = await db.query(query);
        return rows;
    } catch (error) {
        throw error;
    }
}

export const getClientByEmail = async (email: string) => {
    const query = 'SELECT * FROM tbl_client_user WHERE client_email=?';
    try {
        const [rows] = await db.query(query, [email]);
        return rows;
    } catch (error) {
        throw error;
    }
}

export const signUp = (data: Client) => {
    const values = Object.values(data);
    const sql = 'INSERT INTO tbl_client_user (id, client_firstname, client_lastname, client_email, client_password, created_at, updated_at, status)VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, values);
}

export const getClientById = (clientId: string) => {
    const query = 'SELECT * FROM tbl_client_user WHERE id= ?';
    try {
        return db.query(query, [clientId]);
    } catch (error) {
        throw error;
    }
}

export const updateClientById = (data: any) => {
    const convertToArray = Object.values(data);
    try {
        const query = 'UPDATE tbl_client_user SET client_firstname=?, client_lastname=?, client_email=?, client_password=?, updated_at=?, status=?, client_address=?, client_phone=? WHERE id=?';
        db.query(query, convertToArray);
    } catch (error) {
        throw error;
    }
}
