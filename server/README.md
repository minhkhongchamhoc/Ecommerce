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
- `PUT /api/orders/:orderId/payment` - Update payment status (Admin only)
- `PUT /api/orders/:orderId/cancel` - Cancel order
- `GET /api/orders/admin/all` - Get all orders (Admin only)
- `GET /api/orders/admin/search` - Search orders by status (Admin only)

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
   - For COD: Payment status remains pending
   - For other methods: Payment must be completed
3. **shipping**: Order is being shipped
4. **delivered**: Order is delivered successfully
   - For COD: Payment status is updated to paid
5. **cancelled**: Order is cancelled
   - If paid: Payment status is updated to failed (refund process needed)
   - If not paid: Payment status is updated to failed

## Payment Status Flow
1. **pending**: Initial state when order is created
2. **paid**: Payment is successful
   - Required for non-COD orders before confirmation
   - Automatically set for COD orders upon delivery
3. **failed**: Payment failed
   - Set when order is cancelled
   - May require refund process

## Order Status Update API
### Endpoint: `PUT /api/orders/:orderId/status`
- **Access**: Admin only
- **Request Body**:
  ```json
  {
    "status": "confirmed" // or "shipping", "delivered", "cancelled"
  }
  ```
- **Status Transitions**:
  - `pending` → `confirmed` or `cancelled`
  - `confirmed` → `shipping` or `cancelled`
  - `shipping` → `delivered` or `cancelled`
  - `delivered` → no transitions allowed
  - `cancelled` → no transitions allowed
- **Payment Status Handling**:
  - On `confirmed`:
    - COD: Payment remains pending
    - Other methods: Must be paid
  - On `delivered`:
    - COD: Payment status updated to paid
  - On `cancelled`:
    - If paid: Payment status updated to failed (refund needed)
    - If not paid: Payment status updated to failed

## Payment Status Update API
### Endpoint: `PUT /api/orders/:orderId/payment`
- **Access**: Admin only
- **Request Body**:
  ```json
  {
    "paymentStatus": "paid" // or "pending", "failed"
  }
  ```
- **Validation Rules**:
  - COD orders:
    - Can only be marked as `paid` when delivered
    - Automatically marked as `paid` on delivery
  - Other payment methods:
    - Must be marked as `paid` before order confirmation
    - Can be marked as `failed` if payment fails
    - Automatically marked as `failed` when cancelled

- **Payment Method Rules**:
  - **COD (Cash On Delivery)**:
    - Initial status: `pending`
    - Can be confirmed without payment
    - Marked as `paid` only after delivery
  - **Credit Card/Bank Transfer**:
    - Must be `paid` before order confirmation
    - Requires payment verification
    - Can be refunded if cancelled

- **Error Cases**:
  - Invalid order ID format
  - Order not found
  - Invalid payment status
  - Invalid status transition for payment method
  - Unauthorized access

## Admin Order Management APIs
### Endpoint: `GET /api/orders/admin/all`
- **Access**: Admin only
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "orders": [...],
      "pagination": {
        "total": number,
        "page": number,
        "limit": number,
        "totalPages": number
      }
    }
  }
  ```

### Endpoint: `GET /api/orders/admin/search`
- **Access**: Admin only
- **Query Parameters**:
  - `status`: Order status to search for (required)
    - Valid values: `pending`, `confirmed`, `shipping`, `delivered`, `cancelled`
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "orders": [...],
      "pagination": {
        "total": number,
        "page": number,
        "limit": number,
        "totalPages": number
      }
    }
  }
  ```
- **Error Cases**:
  - Invalid status value
  - Missing status parameter
  - Invalid pagination parameters
  - Unauthorized access

## Development
To run the project locally:
1. Install dependencies: `npm install`
2. Set up environment variables in `.env`
3. Run the server: `npm run dev`
4. Access API documentation at: `http://localhost:5000/api-docs`

## API Testing Procedures

### 1. Authentication Testing
1. **Register User**
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
   -H "Content-Type: application/json" \
   -d '{
     "email": "test@example.com",
     "password": "password123"
   }'
   ```

2. **Login User**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
   -H "Content-Type: application/json" \
   -d '{
     "email": "test@example.com",
     "password": "password123"
   }'
   ```
   - Lưu token từ response để sử dụng cho các request tiếp theo

3. **Logout User**
   ```bash
   curl -X POST http://localhost:5000/api/auth/logout \
   -H "Authorization: Bearer <your_token>"
   ```

### 2. Order Management Testing

#### User Order Operations
1. **Create Order (Checkout)**
   ```bash
   curl -X POST http://localhost:5000/api/orders/checkout \
   -H "Authorization: Bearer <your_token>" \
   -H "Content-Type: application/json" \
   -d '{
     "selectedItems": ["cart_item_id_1", "cart_item_id_2"],
     "contactInfo": {
       "phoneNumber": "1234567890",
       "email": "test@example.com"
     },
     "shippingAddress": {
       "firstName": "John",
       "lastName": "Doe",
       "addressLine1": "123 Main St",
       "city": "New York",
       "country": "USA",
       "state": "NY",
       "postalCode": "10001"
     },
     "paymentInfo": {
       "paymentMethod": "credit_card",
       "cardNumber": "4111111111111111",
       "nameOnCard": "John Doe",
       "expirationDate": "12/25",
       "cvc": "123"
     }
   }'
   ```

2. **Get User Orders**
   ```bash
   curl -X GET http://localhost:5000/api/orders \
   -H "Authorization: Bearer <your_token>"
   ```

3. **Get Order Details**
   ```bash
   curl -X GET http://localhost:5000/api/orders/<order_id> \
   -H "Authorization: Bearer <your_token>"
   ```

4. **Cancel Order**
   ```bash
   curl -X PUT http://localhost:5000/api/orders/<order_id>/cancel \
   -H "Authorization: Bearer <your_token>"
   ```

#### Admin Order Operations
1. **Get All Orders**
   ```bash
   curl -X GET "http://localhost:5000/api/orders/admin/all?page=1&limit=10" \
   -H "Authorization: Bearer <admin_token>"
   ```

2. **Search Orders by Status**
   ```bash
   curl -X GET "http://localhost:5000/api/orders/admin/search?status=pending&page=1&limit=10" \
   -H "Authorization: Bearer <admin_token>"
   ```

3. **Update Order Status**
   ```bash
   curl -X PUT http://localhost:5000/api/orders/<order_id>/status \
   -H "Authorization: Bearer <admin_token>" \
   -H "Content-Type: application/json" \
   -d '{
     "status": "confirmed"
   }'
   ```

4. **Update Payment Status**
   ```bash
   curl -X PUT http://localhost:5000/api/orders/<order_id>/payment \
   -H "Authorization: Bearer <admin_token>" \
   -H "Content-Type: application/json" \
   -d '{
     "paymentStatus": "paid"
   }'
   ```

### 3. Testing Tools
1. **Postman Collection**
   - Import file `postman_collection.json` vào Postman
   - Set up environment variables:
     - `base_url`: http://localhost:5000
     - `token`: JWT token sau khi login

2. **Automated Testing**
   ```bash
   # Run all tests
   npm test

   # Run specific test file
   npm test -- orders.test.ts

   # Run tests with coverage
   npm run test:coverage
   ```

### 4. Test Cases

#### Authentication
- [ ] Register with valid data
- [ ] Register with existing email
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Access protected route without token
- [ ] Access protected route with invalid token

#### Order Management
- [ ] Create order with valid data
- [ ] Create order with empty cart
- [ ] Create order with invalid payment info
- [ ] Get user orders
- [ ] Get order details
- [ ] Cancel pending order
- [ ] Cancel non-pending order
- [ ] Admin: Get all orders
- [ ] Admin: Search orders by status
- [ ] Admin: Update order status
- [ ] Admin: Update payment status

### 5. Error Handling
Test các trường hợp lỗi:
1. **400 Bad Request**
   - Invalid input data
   - Missing required fields
   - Invalid status values

2. **401 Unauthorized**
   - Missing token
   - Invalid token
   - Expired token

3. **403 Forbidden**
   - User trying to access admin routes
   - Invalid role permissions

4. **404 Not Found**
   - Invalid order ID
   - Non-existent resource

5. **500 Server Error**
   - Database connection issues
   - Internal server errors

### 6. Performance Testing
1. **Load Testing**
   ```bash
   # Install artillery
   npm install -g artillery

   # Run load test
   artillery run load-tests/orders.yml
   ```

2. **Stress Testing**
   - Test với số lượng request lớn
   - Kiểm tra response time
   - Kiểm tra error rate

### 7. Security Testing
1. **JWT Security**
   - Test token expiration
   - Test token tampering
   - Test token replay attacks

2. **Input Validation**
   - Test SQL injection
   - Test XSS attacks
   - Test input sanitization

3. **Authorization**
   - Test role-based access control
   - Test resource ownership
   - Test admin privileges 