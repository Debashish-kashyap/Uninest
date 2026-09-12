const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const upload = require('../middleware/upload');

// POST /api/auth/register
// Conditionally use multer only when Content-Type is multipart/form-data
router.post('/register', (req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  if (contentType.includes('multipart/form-data')) {
    upload.single('studentIdImage')(req, res, next);
  } else {
    next();
  }
}, register);

// POST /api/auth/login
router.post('/login', login);

module.exports = router;
