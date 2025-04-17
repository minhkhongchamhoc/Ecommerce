import mongoose, { Document, Schema } from 'mongoose';

export interface IProductInventory extends Document {
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  products?: any[];
}

const productInventorySchema = new Schema({
  quantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field for relationship with products
productInventorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'inventory_id'
});

export default mongoose.model<IProductInventory>('ProductInventory', productInventorySchema); 