const express = require('express');
const bcrypt = require('bcryptjs');
const { pool } = require('../db');

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body || {};
		if (!username || !password) {
			return res.json({status:false});
		}

		// Query user by username
		// pool.execute(
		// 	'SELECT id, username, password_hash FROM users WHERE username = ? LIMIT 1',
		// 	[username],
		// 	(err, results) => {
		// 		if (err) {
		// 			console.error('DB error:', err);
		// 			return res.json(false);
		// 		}
		// 		if (!results || results.length === 0) {
		// 			return res.json(false);
		// 		}
		// 		const user = results[0];
		// 		const ok = bcrypt.compareSync(password, user.password_hash);
		// 		return res.json(Boolean(ok));
		// 	}
		// );
		let sql = `select * from users where username = '${username}' and password = '${password}'`;
		const [rows, fields] = await pool.query(sql);
		console.log({rows, fields});
		return res.json({status:rows.length > 0});
	} catch (e) {
		console.error(e);
		return res.json({status:false});
	}
});

module.exports = router;


