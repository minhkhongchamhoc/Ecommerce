const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function testMongoConnection() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB successfully!');

        // Test User collection
        const User = require('../models/User');
        const users = await User.find().limit(5);
        console.log('First 5 users:', users);

        // Test Product collection
        const Product = require('../models/Product');
        const products = await Product.find().limit(5);
        console.log('First 5 products:', products);

        // Close connection
        await mongoose.connection.close();
        console.log('Connection closed');
    } catch (error) {
        console.error('Error:', error);
    }
}

testMongoConnection(); 