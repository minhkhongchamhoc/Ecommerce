const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  desc: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field for relationship with products
productCategorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'category_id'
});

module.exports = mongoose.model('ProductCategory', productCategorySchema); 