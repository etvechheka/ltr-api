import mysql from 'mysql2';

const connectionConfig = {
    host: '175.100.42.58',
    user: 'ltr-userdb',
    password: 'I7p7?)3zF-vx',
    database: 'ecommerce_db',
    port: 3306
};

const directConnection = mysql.createConnection(connectionConfig);
directConnection.connect(err => {
    if (err) {
        console.error('Error connecting: ' + err);
        return;
    }
    console.log('Direct connection successful on port %s as id %d', connectionConfig.port, directConnection.threadId);
});

export default directConnection