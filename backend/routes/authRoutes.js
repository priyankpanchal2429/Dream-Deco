const express = require('express');
const { registerUser, loginUser, resetPassword } = require('../functions/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', resetPassword);

module.exports = router;
