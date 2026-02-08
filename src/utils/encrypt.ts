import bcrypt from 'bcrypt';

 // Instance method to check if passwords match
export const comparedPassword = async (passwordHash: string, passwordText: string) => {
    return await bcrypt.compare(passwordText, passwordHash);
}

export const encryptPassword = async (passwordText: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(passwordText, salt);
}