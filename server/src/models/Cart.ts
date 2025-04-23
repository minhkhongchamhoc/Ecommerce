import mongoose, { Document, Model, Schema } from 'mongoose';

// Interface for cart items (without Document extension)
export interface ICartItem {
  _id: mongoose.Types.ObjectId;  // Subdocument ID
  product: mongoose.Types.ObjectId | string;  // Reference to Product document
  quantity: number;
  size: string;
  price: number;
}

// Interface for cart
export interface ICart {
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
  total: number;
  created_at: Date;
  modified_at: Date;
}

// Schema for cart items
const cartItemSchema = new Schema<ICartItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  size: {
    type: String,
    required: [true, 'Size is required'],
    enum: ['S', 'M', 'L', 'XL', 'XXL']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  }
});

// Schema for cart
const cartSchema = new Schema<ICart>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  items: [cartItemSchema],
  total: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  modified_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'modified_at'
  }
});

// Middleware to calculate total before saving
cartSchema.pre('save', async function(next) {
  this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  next();
});

const Cart = mongoose.model<ICart>('Cart', cartSchema);

export default Cart; 