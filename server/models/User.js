const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true,
    trim: true
  },
  last_name: {
    type: String,
    required: true,
    trim: true
  },
  telephone: {
    type: String,
    required: true,
    trim: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  modified_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'modified_at'
  },
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual fields for relationships
userSchema.virtual('addresses', {
  ref: 'UserAddress',
  localField: '_id',
  foreignField: 'user_id'
});

userSchema.virtual('payments', {
  ref: 'UserPayment',
  localField: '_id',
  foreignField: 'user_id'
});

userSchema.virtual('shopping_sessions', {
  ref: 'ShoppingSession',
  localField: '_id',
  foreignField: 'user_id'
});

userSchema.virtual('orders', {
  ref: 'OrderDetails',
  localField: '_id',
  foreignField: 'user_id'
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema); 