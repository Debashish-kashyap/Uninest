const express = require('express');
const router = express.Router();
const { createPG, getAllPGs, getPGById, getOwnerPGs } = require('../controllers/pgController');
const { addReview, getReviews } = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/auth');

// PG Listing routes
router.post('/', protect, authorize('owner'), createPG);
router.get('/', getAllPGs);

// Owner-specific route (must come before /:id)
router.get('/owner', protect, authorize('owner'), getOwnerPGs);

// Single PG
router.get('/:id', getPGById);

// Review routes
router.post('/:id/review', protect, authorize('student'), addReview);
router.get('/:id/reviews', getReviews);

module.exports = router;
