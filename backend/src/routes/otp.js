const express = require('express');
const crypto = require('crypto');
const { pool } = require('../db');
const { sendMail } = require('../mailer');

const router = express.Router();

// In-memory OTP store: { email: { code, expiresAt } }
const otpStore = new Map();

function generateOtp() {
  // 6-digit OTP
  const num = crypto.randomInt(0, 1000000);
  return num.toString().padStart(6, '0');
}

// POST /api/auth/otp/request { email }
router.post('/otp/request', async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) return res.json({ status: false });

    const [rows] = await pool.query('SELECT id, username, email FROM users WHERE email = ? LIMIT 1', [email]);
    if (!rows || rows.length === 0) return res.json({ status: false });

    const code = generateOtp();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    otpStore.set(email, { code, expiresAt });

    await sendMail(
      email,
      'Mã OTP đặt lại mật khẩu',
      `<p>Mã OTP của bạn là: <b>${code}</b></p><p>OTP hết hạn sau 10 phút.</p>`
    );

    return res.json({ status: true });
  } catch (e) {
    console.error(e);
    return res.json({ status: false });
  }
});

// POST /api/auth/otp/verify { email, otp, newPassword }
router.post('/otp/verify', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body || {};
    if (!email || !otp || !newPassword) return res.json({ status: false });

    const entry = otpStore.get(email);
    if (!entry) return res.json({ status: false });
    if (Date.now() > entry.expiresAt) {
      otpStore.delete(email);
      return res.json({ status: false, reason: 'expired' });
    }
    if (String(otp) !== String(entry.code)) return res.json({ status: false });

    // Update password (plain to match existing demo logic)
    await pool.query('UPDATE users SET password = ? WHERE email = ?', [newPassword, email]);
    otpStore.delete(email);
    return res.json({ status: true });
  } catch (e) {
    console.error(e);
    return res.json({ status: false });
  }
});

module.exports = router;


