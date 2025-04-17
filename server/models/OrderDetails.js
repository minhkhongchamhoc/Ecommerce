const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderDetails',
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
});

const orderDetailsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  payment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserPayment',
    required: true
  }
}, {
  timestamps: true
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);
const OrderDetails = mongoose.model('OrderDetails', orderDetailsSchema);

module.exports = {
  OrderItem,
  OrderDetails
}; 