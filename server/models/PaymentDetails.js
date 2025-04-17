const mongoose = require('mongoose');

const paymentDetailsSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderDetails',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  provider: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field for relationship
paymentDetailsSchema.virtual('order', {
  ref: 'OrderDetails',
  localField: 'order_id',
  foreignField: '_id',
  justOne: true
});

module.exports = mongoose.model('PaymentDetails', paymentDetailsSchema); 