import bcrypt from 'bcryptjs';
import validator from 'validator';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// ============================================================================
// @desc    Register a new user account
// @route   POST /api/auth/register
// @access  Public
// ============================================================================
export const register = async (req, res) => {
  try {
    const { fullName, email, password, phone, role, avatar } = req.body;

    // 1. Validation: Check required fields
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide fullName, email, and password.',
      });
    }

    // 2. Validation: Validate email format using validator
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address format.',
      });
    }

    // 3. Validation: Check password minimum length (6 characters)
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.',
      });
    }

    // 4. Validation: Check if email is already registered (unique constraint)
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists.',
      });
    }

    // 5. Security: Hash password before saving to DB using bcryptjs
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 6. Database: Create and save new user record
    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      phone: phone || '',
      password: hashedPassword,
      role: 'customer',
      avatar: avatar || '',
      isVerified: false,
    });

    if (user) {
      // 7. Response: Return success, message, and user details
      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          avatar: user.avatar,
          isVerified: user.isVerified,
          createdAt: user.createdAt,
        },
        // Optionally generating token so frontend can immediately authenticate if needed
        token: generateToken(user._id, user.email, user.role),
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid user data provided.',
      });
    }
  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during registration process.',
      error: error.message,
    });
  }
};

// ============================================================================
// @desc    Authenticate user & return JWT token + profile
// @route   POST /api/auth/login
// @access  Public
// ============================================================================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    // 2. Locate user in database by lowercase email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // 3. Compare submitted password against stored bcrypt hash
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      // 4. Generate JWT token
      const token = generateToken(user._id, user.email, user.role);

      // 5. Return success, token, and user profile
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          avatar: user.avatar,
          isVerified: user.isVerified,
        },
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during login.',
    });
  }
};

// ============================================================================
// @desc    Get current authenticated user profile
// @route   GET /api/auth/profile (also mirrored on /api/auth/me)
// @access  Private (Protected by authenticate middleware)
// ============================================================================
export const getProfile = async (req, res) => {
  try {
    // req.user is automatically populated by authenticate middleware
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found.',
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error('Get Profile Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while fetching user profile.',
    });
  }
};

// ============================================================================
// @desc    Logout user session (frontend clear token reminder)
// @route   POST /api/auth/logout
// @access  Public / Private
// ============================================================================
export const logout = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: 'Logged out successfully. Token removed from active state.',
    });
  } catch (error) {
    console.error('Logout Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during logout.',
    });
  }
};

// ============================================================================
// @desc    Update customer profile details (fullName, phone)
// @route   PUT /api/auth/profile
// @access  Private
// ============================================================================
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User profile not found.' });
    }

    user.fullName = req.body.fullName || user.fullName;
    if (req.body.phone !== undefined) {
      user.phone = req.body.phone;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Profile details updated successfully.',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error('Update Profile Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error while updating profile.' });
  }
};

// ============================================================================
// @desc    Change customer password
// @route   PUT /api/auth/password
// @access  Private
// ============================================================================
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Please provide both current and new passwords.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters long.' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect current password.' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    return res.status(200).json({ success: true, message: 'Security password updated successfully.' });
  } catch (error) {
    console.error('Change Password Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error while changing password.' });
  }
};
