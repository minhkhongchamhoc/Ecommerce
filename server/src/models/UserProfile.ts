import mongoose, { Schema, Document } from 'mongoose';

export interface IUserProfile extends Document {
  user: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  addresses: {
    type: 'home' | 'work' | 'other';
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    isDefault: boolean;
  }[];
  paymentMethods: {
    type: 'credit_card' | 'bank_transfer' | 'COD';
    cardNumber?: string;
    nameOnCard?: string;
    expirationDate?: string;
    cvc?: string;
    bankName?: string;
    accountNumber?: string;
    isDefault: boolean;
  }[];
  preferences: {
    language: string;
    currency: string;
    newsletterSubscription: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  addresses: [{
    type: {
      type: String,
      enum: ['home', 'work', 'other'],
      required: true
    },
    addressLine1: {
      type: String,
      required: true
    },
    addressLine2: String,
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  }],
  paymentMethods: [{
    type: {
      type: String,
      enum: ['credit_card', 'bank_transfer', 'COD'],
      required: true
    },
    cardNumber: String,
    nameOnCard: String,
    expirationDate: String,
    cvc: String,
    bankName: String,
    accountNumber: String,
    isDefault: {
      type: Boolean,
      default: false
    }
  }],
  preferences: {
    language: {
      type: String,
      default: 'en'
    },
    currency: {
      type: String,
      default: 'USD'
    },
    newsletterSubscription: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});

export default mongoose.model<IUserProfile>('UserProfile', UserProfileSchema); 