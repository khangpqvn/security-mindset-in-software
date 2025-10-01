const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const {
	SMTP_HOST = 'smtp.example.com',
	SMTP_PORT = '587',
	SMTP_SECURE = 'false',
	SMTP_USER = 'user@example.com',
	SMTP_PASS = 'password',
	MAIL_FROM = 'no-reply@example.com',
} = process.env;

function createTransport() {
	return nodemailer.createTransport({
		host: SMTP_HOST,
		port: Number(SMTP_PORT),
		secure: String(SMTP_SECURE).toLowerCase() === 'true',
		auth: {
			user: SMTP_USER,
			pass: SMTP_PASS,
		},
	});
}

async function sendMail(to, subject, html) {
	// const transporter = createTransport();
	// await transporter.sendMail({ from: MAIL_FROM, to, subject, html });
	console.log({to, subject, html});
}

module.exports = { sendMail };


