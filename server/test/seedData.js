const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Import models
const User = require('../models/User');
const Product = require('../models/Product');
const ProductCategory = require('../models/ProductCategory');
const ProductInventory = require('../models/ProductInventory');

// Sample data
const sampleUsers = [
    {
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123',
        first_name: 'Admin',
        last_name: 'User',
        telephone: '0123456789',
        role: 'admin'
    },
    {
        username: 'user1',
        email: 'user1@example.com',
        password: 'user123',
        first_name: 'Normal',
        last_name: 'User',
        telephone: '0987654321',
        role: 'user'
    }
];

const sampleCategories = [
    {
        name: 'Electronics',
        desc: 'Electronic devices and accessories'
    }
];

const sampleInventories = [
    {
        quantity: 10
    },
    {
        quantity: 15
    },
    {
        quantity: 20
    }
];

async function seedData() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB successfully!');

        // Clear existing data
        await User.deleteMany({});
        await Product.deleteMany({});
        await ProductCategory.deleteMany({});
        await ProductInventory.deleteMany({});
        console.log('Cleared existing data');

        // Insert categories and get IDs
        const categories = await ProductCategory.insertMany(sampleCategories);
        console.log('Categories inserted');

        // Insert inventories and get IDs
        const inventories = await ProductInventory.insertMany(sampleInventories);
        console.log('Inventories inserted');

        // Prepare products with references
        const sampleProducts = [
            {
                name: 'Laptop Gaming Asus',
                desc: 'Laptop gaming hiệu năng cao',
                SKU: 'LAP-ASUS-001',
                price: 25000000,
                category_id: categories[0]._id,
                inventory_id: inventories[0]._id
            },
            {
                name: 'iPhone 15 Pro',
                desc: 'Điện thoại cao cấp mới nhất từ Apple',
                SKU: 'IPH-15PRO-001',
                price: 30000000,
                category_id: categories[0]._id,
                inventory_id: inventories[1]._id
            },
            {
                name: 'Tai nghe Sony WH-1000XM4',
                desc: 'Tai nghe chống ồn cao cấp',
                SKU: 'HPH-SONY-001',
                price: 8000000,
                category_id: categories[0]._id,
                inventory_id: inventories[2]._id
            }
        ];

        // Insert users
        await User.insertMany(sampleUsers);
        console.log('Users inserted');

        // Insert products
        await Product.insertMany(sampleProducts);
        console.log('Products inserted');

        // Verify data
        const users = await User.find();
        const products = await Product.find().populate('category_id inventory_id');
        console.log('\nUsers:', users);
        console.log('\nProducts:', products);

        // Close connection
        await mongoose.connection.close();
        console.log('\nConnection closed');
    } catch (error) {
        console.error('Error:', error);
        await mongoose.connection.close();
    }
}

// Run the seeding
seedData(); 