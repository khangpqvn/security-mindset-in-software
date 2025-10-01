const express = require('express');
const router = express.Router();

router.use('/auth', require('./login'));
router.use('/auth', require('./forgot'));
router.use('/auth', require('./otp'));

module.exports = router;


