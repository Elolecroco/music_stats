require('dotenv').config();
const mysql2 = require('mysql2/promise');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const db = mysql2.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
});

db.getConnection().catch(() => {
    console.warn(
        "Warning: DB failed",
    );
})

module.exports = db;