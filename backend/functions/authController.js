const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../database/User');

const JWT_SECRET = process.env.JWT_SECRET || 'dream_deco_jwt_secret_key_2026';

/**
 * Register a new user
 * POST /api/auth/register
 */
const registerUser = async (req, res) => {
  try {
    const { fullName, userId, password, confirmPassword } = req.body;
    const errors = {};

    const trimmedName = fullName ? fullName.trim() : '';
    const trimmedId = userId ? userId.trim() : '';

    if (!trimmedName) errors.fullName = 'Full Name is required';
    if (!trimmedId) errors.userId = 'User ID is required';
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ isValid: false, errors });
    }

    // Check uniqueness
    const existingUser = await User.findOne({ user_id: trimmedId.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        isValid: false,
        errors: { userId: 'User ID already exists' },
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Save user to MongoDB
    const user = await User.create({
      full_name: trimmedName,
      user_id: trimmedId,
      password_hash,
    });

    const safeUser = user.toJSON();

    return res.status(201).json({
      isValid: true,
      errors: {},
      successMessage: 'Account created successfully! You can now sign in.',
      user: safeUser,
    });
  } catch (error) {
    console.error('[Register Error]', error);
    if (error.code === 11000 || (error.message && error.message.includes('E11000'))) {
      return res.status(400).json({
        isValid: false,
        errors: { userId: 'User ID already exists' },
      });
    }
    return res.status(400).json({
      isValid: false,
      errors: {},
      generalError: error.message || 'Error during account creation. Please check inputs.',
    });
  }
};

/**
 * Login existing user
 * POST /api/auth/login
 */
const loginUser = async (req, res) => {
  try {
    const { userId, password } = req.body;

    const trimmedId = userId ? userId.trim() : '';
    const trimmedPassword = password ? password.trim() : '';

    if (!trimmedId || !trimmedPassword) {
      return res.status(400).json({
        success: false,
        error: 'User ID and Password are required.',
      });
    }

    const user = await User.findOne({ user_id: trimmedId.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid User ID or Password.',
      });
    }

    const isMatch = await bcrypt.compare(trimmedPassword, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid User ID or Password.',
      });
    }

    const token = jwt.sign(
      { id: user._id, user_id: user.user_id },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const safeUser = user.toJSON();

    return res.status(200).json({
      success: true,
      user: safeUser,
      token,
    });
  } catch (error) {
    console.error('[Login Error]', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred.',
    });
  }
};

/**
 * Forgot / Reset Password
 * POST /api/auth/forgot-password
 */
const resetPassword = async (req, res) => {
  try {
    const { fullName, userId, newPassword, confirmPassword } = req.body;
    const errors = {};

    const trimmedName = fullName ? fullName.trim() : '';
    const trimmedId = userId ? userId.trim() : '';

    if (!trimmedName) errors.fullName = 'Full Name is required';
    if (!trimmedId) errors.userId = 'User ID is required';
    if (!newPassword) {
      errors.password = 'New Password is required';
    } else if (newPassword.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ isValid: false, errors });
    }

    const user = await User.findOne({
      user_id: trimmedId.toLowerCase(),
    });

    if (!user || user.full_name.toLowerCase() !== trimmedName.toLowerCase()) {
      return res.status(400).json({
        isValid: false,
        errors: {},
        generalError: 'Name and User ID do not match any existing account.',
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password_hash = await bcrypt.hash(newPassword, salt);
    await user.save();

    return res.status(200).json({
      isValid: true,
      errors: {},
      successMessage: 'Your password has been successfully updated.',
    });
  } catch (error) {
    console.error('[Reset Password Error]', error);
    return res.status(500).json({
      isValid: false,
      errors: {},
      generalError: 'Failed to update password. Please try again.',
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  resetPassword,
};
