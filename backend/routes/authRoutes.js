const express = require('express');
const {
  registerUser,
  loginUser,
  resetPassword,
  getMe,
  logoutUser,
} = require('../functions/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', resetPassword);
router.get('/me', getMe);
router.post('/logout', logoutUser);

module.exports = router;
