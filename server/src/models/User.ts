import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  role: 'user' | 'admin';
  created_at: Date;
  modified_at: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

interface IUserModel extends Model<IUser> {
  // Add any static methods here if needed
}

const userSchema = new Schema<IUser, IUserModel>({
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
  console.log('Stored hashed password:', this.password);
  console.log('Candidate password:', candidatePassword);
  const result = await bcrypt.compare(candidatePassword, this.password);
  console.log('Compare result:', result);
  return result;
};

const User = mongoose.model<IUser, IUserModel>('User', userSchema);

export default User; 