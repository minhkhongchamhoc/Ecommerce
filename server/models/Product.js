const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  desc: {
    type: String,
    trim: true
  },
  SKU: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductCategory',
    required: true
  },
  inventory_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductInventory',
    required: true
  },
  discount_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discount'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual fields for relationships
productSchema.virtual('cart_items', {
  ref: 'CartItem',
  localField: '_id',
  foreignField: 'product_id'
});

productSchema.virtual('order_items', {
  ref: 'OrderItem',
  localField: '_id',
  foreignField: 'product_id'
});

// Virtual for getting current price after discount
productSchema.virtual('final_price').get(function() {
  if (this.discount_id && this.discount_id.active && this.discount_id.discount_percent) {
    return this.price * (1 - this.discount_id.discount_percent / 100);
  }
  return this.price;
});

module.exports = mongoose.model('Product', productSchema); 