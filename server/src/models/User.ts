import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password?: string;
  role: 'user' | 'admin';
  created_at: Date;
  modified_at: Date;
  googleId?: string;
  displayName?: string;
  photoURL?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

interface IUserModel extends Model<IUser> {
  findOrCreateGoogleUser(userData: {
    email: string;
    googleId: string;
    displayName?: string;
    photoURL?: string;
  }): Promise<IUser>;
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
    required: false, // Not required for Google login
    minlength: [6, 'Password must be at least 6 characters long']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  googleId: {
    type: String,
    sparse: true,
    unique: true
  },
  displayName: String,
  photoURL: String,
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

// Hash password before saving (only if password exists)
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next();
  
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
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

// Static method to find or create Google user
userSchema.statics.findOrCreateGoogleUser = async function(userData: {
  email: string;
  googleId: string;
  displayName?: string;
  photoURL?: string;
}): Promise<IUser> {
  let user = await this.findOne({ 
    $or: [
      { googleId: userData.googleId },
      { email: userData.email }
    ]
  });

  if (!user) {
    user = await this.create({
      email: userData.email,
      googleId: userData.googleId,
      displayName: userData.displayName,
      photoURL: userData.photoURL
    });
  } else if (!user.googleId) {
    // If user exists but doesn't have googleId (registered via email)
    user.googleId = userData.googleId;
    user.displayName = userData.displayName;
    user.photoURL = userData.photoURL;
    await user.save();
  }

  return user;
};

const User = mongoose.model<IUser, IUserModel>('User', userSchema);

export default User; 