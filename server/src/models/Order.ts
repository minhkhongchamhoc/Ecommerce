import mongoose, { Document, Model, Schema } from 'mongoose';

// Interface for order items (without Document extension)
export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  size: string;
  price: number;
}

// Interface for contact info
export interface IContactInfo {
  phoneNumber: string;
  email: string;
}

// Interface for shipping address
export interface IShippingAddress {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  country: string;
  state: string;
  postalCode: string;
  aptSuite?: string;
}

// Interface for payment info
export interface IPaymentInfo {
  cardNumber?: string;
  nameOnCard?: string;
  expirationDate?: string;
  cvc?: string;
  paymentMethod: string;
}

// Interface for order summary
export interface IOrderSummary {
  subtotal: number;
  shippingEstimate: number;
  taxEstimate: number;
  total: number;
}

// Interface for order
export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  contactInfo: IContactInfo;
  shippingAddress: IShippingAddress;
  paymentInfo: IPaymentInfo;
  orderSummary: IOrderSummary;
  status: string;
  paymentStatus: string;
  created_at: Date;
  modified_at: Date;
}

// Schema for order items
const orderItemSchema = new Schema<IOrderItem>({
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

// Schema for contact info
const contactInfoSchema = new Schema<IContactInfo>({
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  }
});

// Schema for shipping address
const shippingAddressSchema = new Schema<IShippingAddress>({
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  addressLine1: {
    type: String,
    required: [true, 'Address is required']
  },
  addressLine2: {
    type: String
  },
  city: {
    type: String,
    required: [true, 'City is required']
  },
  country: {
    type: String,
    required: [true, 'Country is required']
  },
  state: {
    type: String,
    required: [true, 'State/Province is required']
  },
  postalCode: {
    type: String,
    required: [true, 'Postal code is required']
  },
  aptSuite: {
    type: String
  }
});

// Schema for payment info
const paymentInfoSchema = new Schema<IPaymentInfo>({
  cardNumber: {
    type: String,
    // We'll encrypt this in production
  },
  nameOnCard: {
    type: String
  },
  expirationDate: {
    type: String
  },
  cvc: {
    type: String
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['credit_card', 'COD', 'bank_transfer'],
    default: 'COD'
  }
});

// Schema for order summary
const orderSummarySchema = new Schema<IOrderSummary>({
  subtotal: {
    type: Number,
    required: true,
    min: [0, 'Subtotal cannot be negative']
  },
  shippingEstimate: {
    type: Number,
    required: true,
    min: [0, 'Shipping estimate cannot be negative']
  },
  taxEstimate: {
    type: Number,
    required: true,
    min: [0, 'Tax estimate cannot be negative']
  },
  total: {
    type: Number,
    required: true,
    min: [0, 'Total cannot be negative']
  }
});

// Schema for order
const orderSchema = new Schema<IOrder>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  items: [orderItemSchema],
  contactInfo: contactInfoSchema,
  shippingAddress: shippingAddressSchema,
  paymentInfo: paymentInfoSchema,
  orderSummary: orderSummarySchema,
  status: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
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

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order; 