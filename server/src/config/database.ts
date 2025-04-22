import mongoose from 'mongoose';
import User from '../models/User';
import * as fs from 'fs';
import * as path from 'path';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('Connected to MongoDB');
    
    // Check if database is empty
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await seedInitialData();
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedInitialData = async () => {
  try {
    // Read seed data
    const usersData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8')
    );

    // Hash passwords before inserting
    for (const userData of usersData.users) {
      const user = new User(userData);
      await user.save(); // This will trigger the password hashing middleware
    }

    console.log('Initial data seeded successfully');
  } catch (error) {
    console.error('Error seeding initial data:', error);
  }
}; 