const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

const {
	DB_HOST = 'localhost',
	DB_USER = 'root',
	DB_PASSWORD = '',
	DB_NAME = 'app',
	DB_PORT = '3306',
} = process.env;

// Create a MySQL connection pool
const pool = mysql.createPool({
	host: DB_HOST,
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME,
	port: Number(DB_PORT),
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

module.exports = {
	pool,
};


