import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem extends Document {
  order_id: mongoose.Types.ObjectId;
  product_id: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IOrderDetails extends Document {
  user_id: mongoose.Types.ObjectId;
  total: number;
  payment_id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema({
  order_id: {
    type: Schema.Types.ObjectId,
    ref: 'OrderDetails',
    required: true
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const orderDetailsSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  payment_id: {
    type: Schema.Types.ObjectId,
    ref: 'UserPayment',
    required: true
  }
}, {
  timestamps: true
});

export const OrderItem = mongoose.model<IOrderItem>('OrderItem', orderItemSchema);
export const OrderDetails = mongoose.model<IOrderDetails>('OrderDetails', orderDetailsSchema);

export default {
  OrderItem,
  OrderDetails
}; 