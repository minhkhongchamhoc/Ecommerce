import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import bcrypt from 'bcryptjs';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
dotenv.config();

interface UserData {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  telephone: string;
  role: string;
  is_active: boolean;
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

        // Create user without hashing password again
        const user = await User.create({
          ...userData,
          password: userData.password // Không hash password ở đây
        });

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