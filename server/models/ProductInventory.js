const mongoose = require('mongoose');

const productInventorySchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field for relationship with products
productInventorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'inventory_id'
});

module.exports = mongoose.model('ProductInventory', productInventorySchema); 