
import db from '../config/connect.config';
import { CategoryProps } from '../schema/category.schema';

export const addCategory = (data:CategoryProps, callback) => {
    
    const sql = 'INSERT INTO tbl_category(title, description, image, created_at)VALUES(?, ?, ?, ?)';
    const objectToArray = Object.values(data);
    try {
        return db.query(sql, objectToArray, callback);
    } catch (error) {
        throw error
    }
}

export const getAllCategories = (callback: any) => {
    const query = 'SELECT * FROM tbl_category';
    try {
       return db.query(query, callback) as any;
    } catch (error) {
        throw error;
    }
}

export const getCategoryByTitle = (title: string, callback: any) => {
    const query = 'SELECT * FROM tbl_category WHERE title = ?';
    try {
        return db.query(query, [title], callback);
    } catch (error) {
        throw error;
    }
}

export const getCategoryById = (categoryId: string, callback: any) => {
    const query = 'SELECT * FROM tbl_category WHERE id = ?';
    try {
        return db.query(query, [categoryId], callback);
    } catch (error) {
        throw error;
    }
}


export const updateCategoryById = (categoryId: string, data: any, callback: any) => {
    const convertToArray = Object.values(data);
    const newData = [...convertToArray, categoryId]
    try {
        const query = 'UPDATE tbl_category SET title=?, description=?, image=? WHERE id=?';
        return db.query(query, newData, callback);
    } catch (error) {
        throw error
    }
}

export const deleteCategoryById = (categoryId: string, callback: any) => {

    try {
        const sql = 'DELETE FROM tbl_category WHERE id = ?';
        return db.query(sql, [categoryId], callback);
    } catch (error) {
        
    }
}
