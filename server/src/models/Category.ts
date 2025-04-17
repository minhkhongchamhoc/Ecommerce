import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description?: string;
  createdAt: Date;
}

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<ICategory>('Category', categorySchema); 