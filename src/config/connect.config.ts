import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const connectionConfig = {
    development: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'ltr_supply_db',
        port: 8889
    },
    production: {
        host: '175.100.42.58',
        user: 'ltr-userdb',
        password: 'I7p7?)3zF-vx',
        database: 'ecommerce_db',
        port: 3306
    }
};

const dataConfig = process.env.NODE_ENV === 'production' ? connectionConfig.production : connectionConfig.development;

const directConnection = mysql.createConnection(dataConfig);
directConnection.connect(err => {
    if (err) {
        console.error('Error connecting: ' + err);
        return;
    }
    console.log('Direct connection successful on port %s as id %d', dataConfig.port, directConnection.threadId);
});

export default directConnection