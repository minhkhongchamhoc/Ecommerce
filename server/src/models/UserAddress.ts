import mongoose, { Document, Schema } from 'mongoose';

export interface IUserAddress extends Document {
  user_id: mongoose.Types.ObjectId;
  address_line1: string;
  city: string;
  postal_code: string;
  country: string;
  telephone: string;
  mobile?: string;
}

const userAddressSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address_line1: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  postal_code: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  telephone: {
    type: String,
    required: true,
    trim: true
  },
  mobile: {
    type: String,
    trim: true
  }
});

export default mongoose.model<IUserAddress>('UserAddress', userAddressSchema); 