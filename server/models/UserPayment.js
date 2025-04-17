const mongoose = require('mongoose');

const userPaymentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  payment_type: {
    type: String,
    required: true,
    enum: ['credit_card', 'debit_card', 'paypal']
  },
  provider: {
    type: String,
    required: true,
    trim: true
  },
  account_no: {
    type: String,
    required: true,
    trim: true
  },
  expiry: {
    type: Date,
    required: true
  }
});

// Ẩn thông tin thẻ khi trả về JSON
userPaymentSchema.methods.toJSON = function() {
  const obj = this.toObject();
  obj.account_no = '****' + obj.account_no.slice(-4);
  return obj;
};

module.exports = mongoose.model('UserPayment', userPaymentSchema); 