const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  desc: {
    type: String,
    trim: true
  },
  discount_percent: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field for relationship with products
discountSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'discount_id'
});

module.exports = mongoose.model('Discount', discountSchema); 