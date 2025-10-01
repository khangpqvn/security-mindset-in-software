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
	initDatabase: async () => {
		try {
			// 1) Ensure database exists
			const adminConn = await mysql.createConnection({
				host: DB_HOST,
				user: DB_USER,
				password: DB_PASSWORD,
				port: Number(DB_PORT),
			});
			await adminConn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
			await adminConn.end();

			// 2) Ensure tables exist
			const conn = await mysql.createConnection({
				host: DB_HOST,
				user: DB_USER,
				password: DB_PASSWORD,
				port: Number(DB_PORT),
				database: DB_NAME,
			});
			await conn.query(`
				CREATE TABLE IF NOT EXISTS users (
					id INT AUTO_INCREMENT PRIMARY KEY,
					username VARCHAR(255) NOT NULL UNIQUE,
					password VARCHAR(255) NOT NULL,
					email VARCHAR(255) NOT NULL UNIQUE
				) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
			`);

			// 3) Seed default admin if not exists
			const DEFAULT_ADMIN_USER = process.env.DEFAULT_ADMIN_USER || 'admin';
			const DEFAULT_ADMIN_PASS = process.env.DEFAULT_ADMIN_PASS || 'admin123';
			const DEFAULT_ADMIN_EMAIL = process.env.DEFAULT_ADMIN_EMAIL || 'admin@example.com';
			await conn.query(
				'INSERT IGNORE INTO users (username, password, email) VALUES (?, ?, ?)',
				[DEFAULT_ADMIN_USER, DEFAULT_ADMIN_PASS, DEFAULT_ADMIN_EMAIL]
			);
			await conn.end();
			console.log('Database initialized and default admin ensured.');
		} catch (err) {
			console.error('Database initialization error:', err);
		}
	},
};


