const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  session_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShoppingSession',
    required: true
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual fields for CartItem relationships
cartItemSchema.virtual('product', {
  ref: 'Product',
  localField: 'product_id',
  foreignField: '_id',
  justOne: true
});

cartItemSchema.virtual('session', {
  ref: 'ShoppingSession',
  localField: 'session_id',
  foreignField: '_id',
  justOne: true
});

const shoppingSessionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  total: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual fields for ShoppingSession relationships
shoppingSessionSchema.virtual('user', {
  ref: 'User',
  localField: 'user_id',
  foreignField: '_id',
  justOne: true
});

shoppingSessionSchema.virtual('cart_items', {
  ref: 'CartItem',
  localField: '_id',
  foreignField: 'session_id'
});

const CartItem = mongoose.model('CartItem', cartItemSchema);
const ShoppingSession = mongoose.model('ShoppingSession', shoppingSessionSchema);

module.exports = {
  CartItem,
  ShoppingSession
}; 