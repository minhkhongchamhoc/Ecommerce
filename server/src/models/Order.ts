import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderProduct {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IShippingAddress {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  products: IOrderProduct[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress?: IShippingAddress;
  paymentMethod: 'credit_card' | 'paypal' | 'cash_on_delivery';
  createdAt: Date;
}

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'paypal', 'cash_on_delivery'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IOrder>('Order', orderSchema); 