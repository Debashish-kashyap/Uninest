const PGListing = require('../models/PGListing');

// @desc    Add a review to a PG listing
// @route   POST /api/pg/:id/review
// @access  Student only
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ message: 'Rating and comment are required' });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const pg = await PGListing.findById(req.params.id);
    if (!pg) {
      return res.status(404).json({ message: 'PG listing not found' });
    }

    // Check if student already reviewed
    const alreadyReviewed = pg.reviews.find(
      (r) => r.userId.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You have already reviewed this PG' });
    }

    pg.reviews.push({
      userId: req.user._id,
      rating: Number(rating),
      comment
    });

    await pg.save();

    res.status(201).json({
      message: 'Review added successfully',
      avgRating: pg.avgRating,
      reviewCount: pg.reviews.length
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get reviews for a PG listing
// @route   GET /api/pg/:id/reviews
// @access  Public
exports.getReviews = async (req, res) => {
  try {
    const pg = await PGListing.findById(req.params.id)
      .populate('reviews.userId', 'name');

    if (!pg) {
      return res.status(404).json({ message: 'PG listing not found' });
    }

    res.json({
      reviews: pg.reviews,
      avgRating: pg.avgRating,
      reviewCount: pg.reviews.length
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
