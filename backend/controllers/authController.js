const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, verificationType, universityEmail } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Build user object
    const userData = { name, email, password, role };

    // Student verification logic
    if (role === 'student') {
      if (!verificationType) {
        return res.status(400).json({ message: 'Student must specify verificationType: "email" or "id"' });
      }

      userData.verificationType = verificationType;

      if (verificationType === 'email') {
        if (!universityEmail) {
          return res.status(400).json({ message: 'University email is required for email verification' });
        }
        // Validate academic domain
        const emailLower = universityEmail.toLowerCase();
        if (!emailLower.includes('.edu') && !emailLower.includes('university') && !emailLower.includes('.ac.')) {
          return res.status(400).json({ message: 'University email must be from an academic domain (.edu, .ac.in, etc.)' });
        }
        userData.universityEmail = universityEmail;
      }

      if (verificationType === 'id') {
        if (req.file) {
          userData.studentIdImage = `/uploads/${req.file.filename}`;
        } else {
          return res.status(400).json({ message: 'Student ID image is required for ID verification' });
        }
      }

      // For hackathon: auto-verify
      userData.isVerified = true;
    }

    const user = await User.create(userData);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      token: generateToken(user._id)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      token: generateToken(user._id)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
