import mysql from 'mysql2';

const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ltr_supply_db',
    port: 8889
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