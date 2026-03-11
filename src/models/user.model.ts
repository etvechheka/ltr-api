import db from '../config/connect.config';

export const getAllUsers = async () => {
    const query = 'SELECT * FROM tbl_user';
    try {
       const [rows] = await db.query(query);
        return rows;
    } catch (error) {
        throw error;
    }
}

export const getUserById = async (userId: string) => {
    const query = 'SELECT * FROM tbl_user WHERE id = ?';
    try {
        const [rows] = await db.query(query, [userId]);
        return rows;
    } catch (error) {
        throw error;
    }
}

export const updateUserById = (userId: string, data: any) => {
    const convertToArray = Object.values(data);
    const newData = [...convertToArray, userId]
    try {
        const query = 'UPDATE tbl_user SET full_name=?, username=?, email=?, date_of_birth=?, password_hash=?, role=?, status=? WHERE id=?';
        db.query(query, newData);
    } catch (error) {
        
    }
}
