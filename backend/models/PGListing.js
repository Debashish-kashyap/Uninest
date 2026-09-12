const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    trim: true
  }
}, {
  timestamps: true
});

const pgListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  lat: {
    type: Number,
    required: true,
    default: 26.1445 // Guwahati
  },
  lng: {
    type: Number,
    required: true,
    default: 91.7362 // Guwahati
  },
  availability: {
    type: Boolean,
    default: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviews: [reviewSchema]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual: average rating
pgListingSchema.virtual('avgRating').get(function () {
  if (!this.reviews || this.reviews.length === 0) return 0;
  const sum = this.reviews.reduce((acc, r) => acc + r.rating, 0);
  return parseFloat((sum / this.reviews.length).toFixed(1));
});

module.exports = mongoose.model('PGListing', pgListingSchema);
