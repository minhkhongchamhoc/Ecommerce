import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
dotenv.config();

interface UserData {
  email: string;
  password: string;
  role: string;
}

interface SeedData {
  users: UserData[];
}

class SeedData {
  private static async connectToDatabase() {
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  }

  private static async seedUsers() {
    try {
      // Read users data from JSON file
      const dataPath = path.join(__dirname, 'data', 'users.json');
      const data: SeedData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

      for (const userData of data.users) {
        // Check if user already exists
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
          console.log(`User ${userData.email} already exists`);
          continue;
        }

        // Create user
        const user = new User({
          email: userData.email,
          password: userData.password,
          role: userData.role
        });

        await user.save();
        console.log(`User ${userData.email} created successfully`);
      }
    } catch (error) {
      console.error('Error seeding users:', error);
      process.exit(1);
    }
  }

  public static async seed() {
    try {
      await this.connectToDatabase();
      await this.seedUsers();
      console.log('Seeding completed successfully');
      process.exit(0);
    } catch (error) {
      console.error('Error during seeding:', error);
      process.exit(1);
    }
  }
}

// Run seeding
SeedData.seed(); 