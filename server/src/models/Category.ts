import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description: string;
  created_at: Date;
  modified_at: Date;
}

interface ICategoryModel extends Model<ICategory> {
  // Add any static methods here if needed
}

const categorySchema = new Schema<ICategory, ICategoryModel>({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Category description is required']
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

const Category = mongoose.model<ICategory, ICategoryModel>('Category', categorySchema);

export default Category; 