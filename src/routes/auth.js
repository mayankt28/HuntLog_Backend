const express = require('express');
const router = express.Router();
const {
  register,
  login,
  refresh,
  logout,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');
const { body } = require('express-validator');

router.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
], register);

router.post('/login', [
  body('email').isEmail(),
  body('password').exists(),
], login);

router.get('/refresh', refresh);
router.post('/logout', logout);

router.post('/forgot-password', [body('email').isEmail()], forgotPassword);
router.post('/reset-password/:token', [body('password').isLength({ min: 6 })], resetPassword);

module.exports = router;
