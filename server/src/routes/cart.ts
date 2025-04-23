import { Router, Request, Response } from 'express';
import Cart from '../models/Cart';
import Product from '../models/Product';
import auth from '../middleware/auth';
import mongoose from 'mongoose';

const router = Router();

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's cart details
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    let cart = await Cart.findOne({ user: req.user?._id })
                        .populate('items.product');
    
    if (!cart) {
      cart = new Cart({ user: req.user?._id, items: [] });
      await cart.save();
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *               - size
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *               size:
 *                 type: string
 *                 enum: [S, M, L, XL, XXL]
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *       400:
 *         description: Invalid input or product not found
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.post('/add', auth, async (req: Request, res: Response) => {
  try {
    const { productId, quantity, size } = req.body;

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ message: 'Product not found' });
    }

    // Validate size
    if (!product.sizes.includes(size)) {
      return res.status(400).json({ message: 'Invalid size for this product' });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: req.user?._id });
    if (!cart) {
      cart = new Cart({ user: req.user?._id, items: [] });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId && item.size === size
    );

    if (existingItemIndex > -1) {
      // Update existing item
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        _id: new mongoose.Types.ObjectId(),
        product: new mongoose.Types.ObjectId(productId),
        quantity,
        size,
        price: product.price
      });
    }

    await cart.save();
    
    // Populate product details before sending response
    await cart.populate('items.product');
    
    res.json(cart);
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /api/cart/update/{itemId}:
 *   put:
 *     summary: Update cart item quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Item not found
 *       500:
 *         description: Server error
 */
router.put('/update/:itemId', auth, async (req: Request, res: Response) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user?._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === req.params.itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity < 1) {
      // Remove item if quantity is 0
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    await cart.populate('items.product');
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /api/cart/remove/{itemId}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed from cart successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Item not found
 *       500:
 *         description: Server error
 */
router.delete('/remove/:itemId', auth, async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({ user: req.user?._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === req.params.itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();
    await cart.populate('items.product');
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 