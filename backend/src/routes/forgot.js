const express = require('express');
const crypto = require('crypto');
const { pool } = require('../db');
const { sendMail } = require('../mailer');

const router = express.Router();

// Helper: generate a random password of given length
function generatePassword(len = 10) {
	return crypto.randomBytes(16).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, len);
}

// POST /api/auth/forgot
router.post('/forgot', async (req, res) => {
	try {
		const { email } = req.body || {};
		if (!email) {
			return res.json({ status: false });
		}
		// Map email to account and reset password
		// NOTE: This demo stores raw passwords in DB to match existing login logic.
		// In production, always store hashed passwords and use secure reset tokens.
		const [rows] = await pool.query('SELECT id, username, email FROM users WHERE email = ? LIMIT 1', [email]);
		if (!rows || rows.length === 0) {
			return res.json({ status: false });
		}
		const user = rows[0];
		const newPass = generatePassword(12);
		await pool.query('UPDATE users SET password = ? WHERE id = ?', [newPass, user.id]);
		await sendMail(
			email,
			'Cấp lại mật khẩu',
			`<p>Xin chào ${user.username},</p>
			<p>Mật khẩu mới của bạn là: <b>${newPass}</b></p>
			<p>Vui lòng đăng nhập và đổi mật khẩu ngay sau khi đăng nhập.</p>`
		);
		return res.json({ status: true });
	} catch (e) {
		console.error(e);
		return res.json({ status: false });
	}
});

module.exports = router;


