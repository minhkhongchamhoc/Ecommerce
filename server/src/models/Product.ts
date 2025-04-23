import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: mongoose.Types.ObjectId;
  images: string[];
  sizes: string[];
  stock: number;
  created_at: Date;
  modified_at: Date;
}

interface IProductModel extends Model<IProduct> {
  // Add any static methods here if needed
}

const productSchema = new Schema<IProduct, IProductModel>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Product category is required']
  },
  images: {
    type: [String],
    required: [true, 'Product images are required'],
    validate: [
      {
        validator: function(v: string[]) {
          return v.length === 4;
        },
        message: 'Product must have exactly 4 images'
      },
      {
        validator: function(v: string[]) {
          return v.every(url => {
            try {
              const urlObj = new URL(url);
              // Kiểm tra định dạng ảnh
              const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
              const hasValidExtension = validExtensions.some(ext => 
                urlObj.pathname.toLowerCase().endsWith(ext)
              );
              return hasValidExtension;
            } catch {
              return false;
            }
          });
        },
        message: 'All images must be valid URLs with supported image formats (jpg, jpeg, png, webp)'
      }
    ],
    default: [
      'https://via.placeholder.com/500x500?text=Image+1',
      'https://via.placeholder.com/500x500?text=Image+2',
      'https://via.placeholder.com/500x500?text=Image+3',
      'https://via.placeholder.com/500x500?text=Image+4'
    ]
  },
  sizes: {
    type: [String],
    required: [true, 'Product sizes are required'],
    enum: ['S', 'M', 'L', 'XL', 'XXL'],
    default: ['M']
  },
  stock: {
    type: Number,
    required: [true, 'Product stock is required'],
    min: [0, 'Stock cannot be negative'],
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

const Product = mongoose.model<IProduct, IProductModel>('Product', productSchema);

export default Product; 