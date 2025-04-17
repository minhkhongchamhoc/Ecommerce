import mongoose, { Document, Schema } from 'mongoose';

export interface ICartItem extends Document {
  session_id: mongoose.Types.ObjectId;
  product_id: mongoose.Types.ObjectId;
  quantity: number;
  product?: any;
  session?: any;
}

export interface IShoppingSession extends Document {
  user_id: mongoose.Types.ObjectId;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  user?: any;
  cart_items?: any[];
}

const cartItemSchema = new Schema({
  session_id: {
    type: Schema.Types.ObjectId,
    ref: 'ShoppingSession',
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
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual fields for CartItem relationships
cartItemSchema.virtual('product', {
  ref: 'Product',
  localField: 'product_id',
  foreignField: '_id',
  justOne: true
});

cartItemSchema.virtual('session', {
  ref: 'ShoppingSession',
  localField: 'session_id',
  foreignField: '_id',
  justOne: true
});

const shoppingSessionSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  total: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual fields for ShoppingSession relationships
shoppingSessionSchema.virtual('user', {
  ref: 'User',
  localField: 'user_id',
  foreignField: '_id',
  justOne: true
});

shoppingSessionSchema.virtual('cart_items', {
  ref: 'CartItem',
  localField: '_id',
  foreignField: 'session_id'
});

export const CartItem = mongoose.model<ICartItem>('CartItem', cartItemSchema);
export const ShoppingSession = mongoose.model<IShoppingSession>('ShoppingSession', shoppingSessionSchema);

export default {
  CartItem,
  ShoppingSession
}; 