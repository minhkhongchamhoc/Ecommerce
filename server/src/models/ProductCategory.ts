import mongoose, { Document, Schema } from 'mongoose';

export interface IProductCategory extends Document {
  name: string;
  desc?: string;
  createdAt: Date;
  updatedAt: Date;
  products?: any[];
}

const productCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  desc: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field for relationship with products
productCategorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'category_id'
});

export default mongoose.model<IProductCategory>('ProductCategory', productCategorySchema); 