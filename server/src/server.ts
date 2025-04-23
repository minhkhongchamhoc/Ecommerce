import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { connectDB } from './config/database';
import authRoutes from './routes/auth';
import categoryRoutes from './routes/categories';
import productRoutes from './routes/products';
import cartRoutes from './routes/cart';
import orderRoutes from './routes/orders';
import userProfileRoutes from './routes/userProfile';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB with auto-seeding
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/user', userProfileRoutes);

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'API documentation for the e-commerce application'
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Product: {
          type: 'object',
          required: ['name', 'description', 'price', 'category'],
          properties: {
            name: {
              type: 'string',
              description: 'Product name'
            },
            description: {
              type: 'string',
              description: 'Product description'
            },
            price: {
              type: 'number',
              description: 'Product price'
            },
            category: {
              type: 'string',
              description: 'Category ID'
            },
            images: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Product images URLs'
            },
            sizes: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['S', 'M', 'L', 'XL', 'XXL']
              },
              description: 'Available sizes'
            },
            stock: {
              type: 'number',
              description: 'Available stock'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Products',
        description: 'Product management APIs'
      },
      {
        name: 'Categories',
        description: 'Category management APIs'
      },
      {
        name: 'Auth',
        description: 'Authentication APIs'
      },
      {
        name: 'Cart',
        description: 'Shopping cart APIs'
      },
      {
        name: 'Orders',
        description: 'Order management APIs'
      },
      {
        name: 'User Profile',
        description: 'User profile management APIs'
      }
    ]
  },
  apis: ['./src/routes/*.ts']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
}); 