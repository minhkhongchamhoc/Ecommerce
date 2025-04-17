import mongoose, { Document, Schema } from 'mongoose';

export interface IPaymentDetails extends Document {
  order_id: mongoose.Types.ObjectId;
  amount: number;
  provider: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
  order?: any;
}

const paymentDetailsSchema = new Schema({
  order_id: {
    type: Schema.Types.ObjectId,
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

export default mongoose.model<IPaymentDetails>('PaymentDetails', paymentDetailsSchema); 