const PGListing = require('../models/PGListing');

// @desc    Create a PG listing
// @route   POST /api/pg
// @access  Owner only
exports.createPG = async (req, res) => {
  try {
    const { title, description, price, location, lat, lng, availability, imageUrl } = req.body;

    const pg = await PGListing.create({
      title,
      description,
      price,
      location,
      lat: lat || 26.1445,
      lng: lng || 91.7362,
      availability: availability !== undefined ? availability : true,
      imageUrl,
      ownerId: req.user._id
    });

    res.status(201).json(pg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all PG listings (with filters)
// @route   GET /api/pg
// @access  Public
exports.getAllPGs = async (req, res) => {
  try {
    const { location, minPrice, maxPrice, availability } = req.query;
    const filter = {};

    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (availability !== undefined) {
      filter.availability = availability === 'true';
    }

    const pgs = await PGListing.find(filter)
      .populate('ownerId', 'name email')
      .sort({ createdAt: -1 });

    res.json(pgs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single PG listing
// @route   GET /api/pg/:id
// @access  Public
exports.getPGById = async (req, res) => {
  try {
    const pg = await PGListing.findById(req.params.id)
      .populate('ownerId', 'name email')
      .populate('reviews.userId', 'name');

    if (!pg) {
      return res.status(404).json({ message: 'PG listing not found' });
    }

    res.json(pg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get logged-in owner's PG listings
// @route   GET /api/pg/owner
// @access  Owner only
exports.getOwnerPGs = async (req, res) => {
  try {
    const pgs = await PGListing.find({ ownerId: req.user._id }).sort({ createdAt: -1 });
    res.json(pgs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
