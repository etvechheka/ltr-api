import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connectionConfig = {
    development: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'ltr_supply_db',
        port: 8889,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    },
    production: {
        host: '175.100.42.58',
        user: 'ltr-userdb',
        password: 'I7p7?)3zF-vx',
        database: 'ecommerce_db',
        port: 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
};

const dataConfig = process.env.NODE_ENV == 'production' ? connectionConfig.production : connectionConfig.development;
const directConnection = mysql.createPool(dataConfig);

async function testConnection() {
  try {
    const connection = await directConnection.getConnection();
    console.log("✅ MySQL connected successfully");
    connection.release();
  } catch (err:any) {
    console.error("❌ MySQL connection failed:", err.message);
  }
}
testConnection();
export default directConnection