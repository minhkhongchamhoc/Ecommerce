import mongoose, { Document, Schema } from 'mongoose';

export interface IDiscount extends Document {
  name: string;
  desc?: string;
  discount_percent: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  products?: any[];
}

const discountSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  desc: {
    type: String,
    trim: true
  },
  discount_percent: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field for relationship with products
discountSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'discount_id'
});

export default mongoose.model<IDiscount>('Discount', discountSchema); 