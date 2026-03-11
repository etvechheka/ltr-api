
import db from '../config/connect.config';
import { CategoryProps } from '../schema/category.schema';

export const addCategory = (data:CategoryProps) => {
    
    const sql = 'INSERT INTO tbl_category(title, description, image, created_at)VALUES(?, ?, ?, ?)';
    const objectToArray = Object.values(data);
    try {
        return db.query(sql, objectToArray);
    } catch (error) {
        throw error
    }
}

export const getAllCategories = async () => {
    const query = 'SELECT * FROM tbl_category';
    try {
       const [rows] = await db.query(query);
       return rows;
    } catch (error) {
        throw error;
    }
}

export const getCategoryByTitle = async (title: string) => {
    const query = 'SELECT * FROM tbl_category WHERE title= ?';
    try {
        const [rows] = await db.query(query, [title]);
        return rows;
    } catch (error) {
        throw error;
    }
}

export const getCategoryById = async (categoryId: string) => {
    const query = 'SELECT * FROM tbl_category WHERE id = ?';
    try {
        const [rows] =  await db.query(query, [categoryId]);
        return rows;
    } catch (error) {
        throw error;
    }
}


export const updateCategoryById = (categoryId: string, data: any) => {
    const convertToArray = Object.values(data);
    const newData = [...convertToArray, categoryId]
    try {
        const query = 'UPDATE tbl_category SET title=?, description=?, image=? WHERE id=?';
        db.query(query, newData);
    } catch (error) {
        throw error
    }
}

export const deleteCategoryById = (categoryId: string) => {

    try {
        const sql = 'DELETE FROM tbl_category WHERE id = ?';
        db.query(sql, [categoryId]);
    } catch (error) {
        throw error
    }
}
