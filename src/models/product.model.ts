
import db from '../config/connect.config';
import { ProductProps } from '../schema/product.schema';


export const addProduct = (data:ProductProps) => {
    const sql = 'INSERT INTO tbl_product(id, name, price, detail, image, category_id, product_code, amount_instock, feature, created_at, updated_at)VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const objectToArray = Object.values(data);
    try {
        db.query(sql, objectToArray);
    } catch (error) {
        throw error
    }
}

export const addMoreImage = (data: any) => {
    const sql = "INSERT INTO tbl_product_images(product_id, product_image)VALUES ?";
    try {
        db.query(sql, [data]);
    } catch (error) {
        throw error
    }
}

export const getAllMultipleImage = async () => {
    const sql = 'SELECT * FROM tbl_product_images';
    try {
        const [rows] = await db.query(sql);
        return rows;
    } catch (error) {
        throw error
    }
}

export const getMultipleImage = async (productID: string) => {
    const sql = 'SELECT * FROM tbl_product_images WHERE product_id=?';
    try {
        const [rows] = await db.query(sql, [productID]);
        return rows;
    } catch (error) {
        throw error
    }
}

export const deleteMultipleImage = (id: string) => {
    const sql = 'DELETE FROM tbl_product_images WHERE id=?';
    try {
        db.query(sql, [id]);
    } catch (error) {
        throw error
    }
}
export const deleteImageByProductId = (arrId: string) => {
    const sql = "DELETE FROM tbl_product_images WHERE id IN (?)";
    try {
        db.query(sql, [arrId]);
    } catch (error) {
        
    }
}
export const getProductByFeature = async (feature: string) => {
    const sql = 'SELECT * FROM tbl_product WHERE feature=?';
    try {
        const [rows] = await db.query(sql, [feature]);
        return rows;
    } catch (error) {
        throw error;
    }
}

export const getProductByCategory = async (category_id: string) => {

    try {
        const sql = 'SELECT * FROM tbl_product WHERE category_id=?';
        const [rows] = await db.query(sql, [category_id]);
        return rows;
    } catch (error) {
        throw error
    }
}
export const getAllProducts = async() => {
    const query = 'SELECT * FROM tbl_product';
    try {
       const [rows] = await db.query(query);
       return rows;
    } catch (error) {
        throw error;
    }
}

export const getProductByCode = async (productCode: string) => {
    const sql = 'SELECT * FROM tbl_product WHERE product_code=?';
    try {
        const [rows] = await db.query(sql, [productCode]);
        return rows;
    } catch (error) {
        throw error;
    }
}

export const getProductById = async (productId: string) => {
    const query = 'SELECT * FROM tbl_product WHERE id = ?';
    try {
        const [rows] = await db.query(query, [productId]);
        return rows;
    } catch (error) {
        throw error;
    }
}

export const updateProductById = (productId: string, data: any) => {
    const convertToArray = Object.values(data);
    const newData = [...convertToArray, productId]
    try {
        const query = 'UPDATE tbl_product SET name=?, price=?, detail=?, image=?, category_id=?, product_code=?, amount_instock=?, feature=?, created_at=?, updated_at=? WHERE id=?';
        db.query(query, newData);
    } catch (error) {
        
    }
}

export const deleteProductById = (productId: string) => {

    try {
        const sql = 'DELETE FROM tbl_product WHERE id = ?';
        db.query(sql, [productId]);
    } catch (error) {
        
    }
}
