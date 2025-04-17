import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  telephone: string;
  role: 'user' | 'admin';
  created_at: Date;
  modified_at: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

interface IUserModel extends Model<IUser> {
  // Add any static methods here if needed
}

const userSchema = new Schema<IUser, IUserModel>({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  first_name: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  last_name: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  telephone: {
    type: String,
    required: [true, 'Telephone is required'],
    trim: true,
    match: [/^[0-9]{10,11}$/, 'Please enter a valid phone number']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
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
  },
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual fields for relationships
userSchema.virtual('addresses', {
  ref: 'UserAddress',
  localField: '_id',
  foreignField: 'user'
});

userSchema.virtual('payments', {
  ref: 'UserPayment',
  localField: '_id',
  foreignField: 'user_id'
});

userSchema.virtual('shopping_sessions', {
  ref: 'ShoppingSession',
  localField: '_id',
  foreignField: 'user_id'
});

userSchema.virtual('orders', {
  ref: 'OrderDetails',
  localField: '_id',
  foreignField: 'user_id'
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser, IUserModel>('User', userSchema);

export default User; 