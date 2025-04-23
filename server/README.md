# E-commerce API Documentation

## Table of Contents
- [Overview](#overview)
- [Models](#models)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)

## Overview
This is a RESTful API for an e-commerce application built with Node.js, Express, and MongoDB. The API provides endpoints for managing products, categories, user profiles, shopping cart, and orders.

## Models

### User Profile
```typescript
{
  user: ObjectId,          // Reference to User model
  firstName: String,
  lastName: String,
  phoneNumber: String,
  dateOfBirth: Date,
  gender: String,         // enum: ['male', 'female', 'other']
  addresses: [{
    type: String,         // enum: ['home', 'work', 'other']
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
    isDefault: Boolean
  }]
}
```

### Product
```typescript
{
  name: String,
  description: String,
  price: Number,
  category: ObjectId,     // Reference to Category model
  images: [String],       // Array of image URLs
  sizes: [String],        // enum: ['S', 'M', 'L', 'XL', 'XXL']
  stock: Number,
  created_at: Date,
  updated_at: Date
}
```

### Category
```typescript
{
  name: String,
  description: String,
  created_at: Date,
  updated_at: Date
}
```

### Cart
```typescript
{
  user: ObjectId,         // Reference to User model
  items: [{
    product: ObjectId,    // Reference to Product model
    quantity: Number,
    size: String,         // enum: ['S', 'M', 'L', 'XL', 'XXL']
    price: Number
  }]
}
```

### Order
```typescript
{
  user: ObjectId,         // Reference to User model
  items: [{
    product: ObjectId,    // Reference to Product model
    quantity: Number,
    size: String,         // enum: ['S', 'M', 'L', 'XL', 'XXL']
    price: Number
  }],
  totalAmount: Number,
  status: String,         // enum: ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled']
  paymentStatus: String,  // enum: ['pending', 'paid', 'failed']
  shippingAddress: {
    firstName: String,
    lastName: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    country: String,
    postalCode: String
  },
  contactInfo: {
    phoneNumber: String,
    email: String
  },
  paymentInfo: {
    paymentMethod: String, // enum: ['credit_card', 'COD', 'bank_transfer']
    cardNumber: String,    // Optional
    nameOnCard: String,    // Optional
    expirationDate: String, // Optional
    cvc: String           // Optional
  },
  created_at: Date,
  updated_at: Date
}
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### User Profile
- `GET /api/user/profile` - Get user profile
- `POST /api/user/profile` - Create or update user profile
- `POST /api/user/addresses` - Add new address

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create new category (Admin only)
- `PUT /api/categories/:id` - Update category (Admin only)
- `DELETE /api/categories/:id` - Delete category (Admin only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove item from cart

### Orders
- `POST /api/orders/checkout` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:orderId` - Get order details
- `PUT /api/orders/:orderId/status` - Update order status (Admin only)

## Authentication
The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:
1. Include the JWT token in the Authorization header
2. Format: `Authorization: Bearer <token>`

## Error Handling
The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

Error responses follow this format:
```json
{
  "message": "Error description"
}
```

## Order Status Flow
1. **pending**: Initial state when order is created
2. **confirmed**: Order is confirmed by admin
3. **shipping**: Order is being shipped
4. **delivered**: Order is delivered successfully
5. **cancelled**: Order is cancelled

## Payment Status Flow
1. **pending**: Initial state when order is created
2. **paid**: Payment is successful
3. **failed**: Payment failed

## Development
To run the project locally:
1. Install dependencies: `npm install`
2. Set up environment variables in `.env`
3. Run the server: `npm run dev`
4. Access API documentation at: `http://localhost:5000/api-docs` 