import { Router, Request, Response } from 'express';
import Product from '../models/Product';
import auth from '../middleware/auth';
import { checkRole } from '../middleware/checkRole';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - category
 *         - images
 *         - sizes
 *       properties:
 *         name:
 *           type: string
 *           description: Product name
 *         description:
 *           type: string
 *           description: Product description
 *         price:
 *           type: number
 *           description: Product price
 *         category:
 *           type: string
 *           description: Product category ID
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs (exactly 4 images)
 *           minItems: 4
 *           maxItems: 4
 *         sizes:
 *           type: array
 *           items:
 *             type: string
 *             enum: [S, M, L, XL, XXL]
 *           description: Available sizes
 *         stock:
 *           type: number
 *           description: Product stock quantity
 */

interface CreateProductRequest extends Request {
  body: {
    name: string;
    description: string;
    price: number;
    category: string;
    images: string[];  // Array of image URLs
    sizes: string[];
    stock: number;
  }
}

interface UpdateProductRequest extends Request {
  params: {
    id: string;
  };
  body: Partial<CreateProductRequest['body']>;
}

/**
 * @swagger
 * /api/products/filter:
 *   get:
 *     summary: Filter and search products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search products by name (case-insensitive)
 *         example: "áo thun"
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *         example: "6405f8f71234567890abcdef"
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *         example: 100000
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *         example: 500000
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [price_asc, price_desc, newest]
 *         description: Sort products (price_asc = low to high, price_desc = high to low, newest = latest first)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: Successfully retrieved filtered products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                       description: Total number of products
 *                     page:
 *                       type: number
 *                       description: Current page
 *                     limit:
 *                       type: number
 *                       description: Products per page (fixed at 9)
 *                     totalPages:
 *                       type: number
 *                       description: Total number of pages
 *       500:
 *         description: Server error
 */
router.get('/filter', async (req: Request, res: Response) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      sort,
      page = 1
    } = req.query;

    // Build filter object
    const filter: any = {};

    // Search by name
    if (search) {
      filter.name = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Build sort object
    let sortOption: any = {};
    if (sort) {
      switch (sort) {
        case 'price_asc':
          sortOption = { price: 1 }; // Giá thấp đến cao
          break;
        case 'price_desc':
          sortOption = { price: -1 }; // Giá cao đến thấp
          break;
        case 'newest':
          sortOption = { createdAt: -1 }; // Mới nhất
          break;
        default:
          sortOption = { createdAt: -1 }; // Mặc định là mới nhất
      }
    } else {
      sortOption = { createdAt: -1 }; // Mặc định là mới nhất
    }

    // Fixed limit of 9 products per page
    const limit = 9;
    const skip = (Number(page) - 1) * limit;

    // Execute query with pagination
    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate('category')
        .sort(sortOption)
        .skip(skip)
        .limit(limit),
      Product.countDocuments(filter)
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(total / limit);

    res.json({
      products,
      pagination: {
        total,
        page: Number(page),
        limit,
        totalPages
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *               - images
 *               - sizes
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of image URLs (max 4 images)
 *               sizes:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [S, M, L, XL, XXL]
 *               stock:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Access denied
 *       500:
 *         description: Server error
 */
router.post('/', [auth, checkRole('admin')], async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, images, sizes, stock } = req.body;

    // Validate number of images
    if (!images || !Array.isArray(images) || images.length > 4) {
      return res.status(400).json({ 
        message: 'Product must have between 1 and 4 images' 
      });
    }

    // Validate image URLs
    const isValidImageUrl = (url: string) => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };

    if (!images.every(isValidImageUrl)) {
      return res.status(400).json({ 
        message: 'Invalid image URL format' 
      });
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      images,
      sizes,
      stock
    });

    await product.save();
    res.status(201).json(product);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error',
        errors: Object.values(error.errors).map((err: any) => err.message)
      });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of image URLs (exactly 4 images)
 *                 minItems: 4
 *                 maxItems: 4
 *               sizes:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [S, M, L, XL, XXL]
 *               stock:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Access denied
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.put('/:id', [auth, checkRole('admin')], async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, images, sizes, stock } = req.body;

    // Validate number of images
    if (images && (!Array.isArray(images) || images.length !== 4)) {
      return res.status(400).json({ 
        message: 'Product must have exactly 4 images' 
      });
    }

    // Validate image URLs if provided
    if (images) {
      const isValidImageUrl = (url: string) => {
        try {
          const urlObj = new URL(url);
          const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
          return validExtensions.some(ext => 
            urlObj.pathname.toLowerCase().endsWith(ext)
          );
        } catch {
          return false;
        }
      };

      if (!images.every(isValidImageUrl)) {
        return res.status(400).json({ 
          message: 'All images must be valid URLs with supported image formats (jpg, jpeg, png, webp)' 
        });
      }
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        images,
        sizes,
        stock,
        modified_at: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error',
        errors: Object.values(error.errors).map((err: any) => err.message)
      });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Access denied
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', [auth, checkRole('admin')], async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 20
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Successfully retrieved all products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                       description: Total number of products
 *                     page:
 *                       type: number
 *                       description: Current page
 *                     limit:
 *                       type: number
 *                       description: Products per page
 *                     totalPages:
 *                       type: number
 *                       description: Total number of pages
 *       500:
 *         description: Server error
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find()
        .populate('category')
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit),
      Product.countDocuments()
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages
      }
    });
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 