
import db from '../config/connect.config';
import { ProductProps } from '../schema/product.schema';


export const addProduct = (data:ProductProps, callback: any) => {
    const sql = 'INSERT INTO tbl_product(id, name, price, detail, image, category_id, product_code, amount_instock, feature, created_at, updated_at)VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const objectToArray = Object.values(data);
    try {
        return db.query(sql, objectToArray, callback);
    } catch (error) {
        throw error
    }
}

export const addMoreImage = (data: any, callback: any) => {
    const sql = 'INSERT INTO tbl_product_images(product_id, product_image)VALUES ?';
    try {
        return db.query(sql, [data], callback);
    } catch (error) {
        throw error
    }
}

export const getAllMultipleImage = (callback: any) => {
    const sql = 'SELECT * FROM tbl_product_images';
    try {
        return db.query(sql, callback);
    } catch (error) {
        throw error
    }
}

export const getMultipleImage = (productID: string, callback: any) => {
    const sql = 'SELECT * FROM tbl_product_images WHERE product_id=?';
    try {
        return db.query(sql, [productID], callback)
    } catch (error) {
        throw error
    }
}

export const deleteMultipleImage = (id: string, callback: any) => {
    const sql = 'DELETE FROM tbl_product_images WHERE id=?';
    try {
        return db.query(sql, [id], callback);
    } catch (error) {
        throw error
    }
}
export const deleteImageByProductId = (arrId: string, callback: any) => {
    const sql = "DELETE FROM tbl_product_images WHERE id IN (?)";
    try {
        return db.query(sql, [arrId], callback);
    } catch (error) {
        
    }
}
export const getProductByFeature = (feature: string, callback: any) => {
    const sql = 'SELECT * FROM tbl_product WHERE feature=?';
    try {
        return db.query(sql, [feature], callback);
    } catch (error) {
        throw error;
    }
}

export const getProductByCategory = (category_id: string, callback: any) => {

    try {
        const sql = 'SELECT * FROM tbl_product WHERE category_id=?';
        return db.query(sql, [category_id], callback);
    } catch (error) {
        throw error
    }
}
export const getAllProducts = (callback: any) => {
    const query = 'SELECT * FROM tbl_product';
    try {
       return db.query(query, callback) as any;
    } catch (error) {
        throw error;
    }
}

export const getProductByCode = (productCode: string, callback: any) => {
    const sql = 'SELECT * FROM tbl_product WHERE product_code=?';
    try {
        return db.query(sql, [productCode], callback);
    } catch (error) {
        throw error;
    }
}

export const getProductById = (productId: string, callback: any) => {
    const query = 'SELECT * FROM tbl_product WHERE id = ?';
    try {
        return db.query(query, [productId], callback);
    } catch (error) {
        throw error;
    }
}

export const updateProductById = (productId: string, data: any, callback: any) => {
    const convertToArray = Object.values(data);
    const newData = [...convertToArray, productId]

    try {
        const query = 'UPDATE tbl_product SET name=?, price=?, detail=?, image=?, category_id=?, product_code=?, amount_instock=?, feature=?, created_at=?, updated_at=? WHERE id=?';
        return db.query(query, newData, callback);
    } catch (error) {
        
    }
}

export const deleteProductById = (productId: string, callback: any) => {

    try {
        const sql = 'DELETE FROM tbl_product WHERE id = ?';
        return db.query(sql, [productId], callback);
    } catch (error) {
        
    }
}
