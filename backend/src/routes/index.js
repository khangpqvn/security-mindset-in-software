const express = require('express');
const router = express.Router();

router.use('/auth', require('./login'));

module.exports = router;


