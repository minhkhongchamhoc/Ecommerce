import mongoose from 'mongoose';
import User from '../models/User';
import Category from '../models/Category';
import Product from '../models/Product';
import * as fs from 'fs';
import * as path from 'path';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('Connected to MongoDB');
    
    // Check if database is empty
    const userCount = await User.countDocuments();
    const categoryCount = await Category.countDocuments();
    const productCount = await Product.countDocuments();
    
    if (userCount === 0 || categoryCount === 0 || productCount === 0) {
      await seedInitialData();
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedInitialData = async () => {
  try {
    // Seed Users
    const usersData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8')
    );

    for (const userData of usersData.users) {
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        const user = new User(userData);
        await user.save();
        console.log(`User ${userData.email} created successfully`);
      }
    }

    // Seed Categories
    const categoriesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../data/categories.json'), 'utf-8')
    );

    const categoryMap = new Map();
    for (const categoryData of categoriesData.categories) {
      const existingCategory = await Category.findOne({ name: categoryData.name });
      if (!existingCategory) {
        const category = new Category(categoryData);
        await category.save();
        categoryMap.set(category.name, category._id);
        console.log(`Category ${categoryData.name} created successfully`);
      } else {
        categoryMap.set(existingCategory.name, existingCategory._id);
      }
    }

    // Seed Products
    const productsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8')
    );

    for (const productData of productsData.products) {
      const existingProduct = await Product.findOne({ name: productData.name });
      if (!existingProduct) {
        const categoryId = categoryMap.get(productData.category);
        if (!categoryId) {
          console.log(`Category not found for product: ${productData.name}`);
          continue;
        }
        
        const product = new Product({
          ...productData,
          category: categoryId
        });
        await product.save();
        console.log(`Product ${productData.name} created successfully`);
      }
    }

    console.log('Initial data seeded successfully');
  } catch (error) {
    console.error('Error seeding initial data:', error);
  }
}; 