import { Router, Request, Response } from 'express';
import Order from '../models/Order';
import Cart from '../models/Cart';
import Product from '../models/Product';
import auth from '../middleware/auth';
import mongoose from 'mongoose';

const router = Router();

/**
 * @swagger
 * /api/orders/checkout:
 *   post:
 *     summary: Create a new order (checkout)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contactInfo
 *               - shippingAddress
 *               - paymentInfo
 *               - selectedItems
 *             properties:
 *               selectedItems:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of cart item IDs to checkout
 *               contactInfo:
 *                 type: object
 *                 required:
 *                   - phoneNumber
 *                   - email
 *                 properties:
 *                   phoneNumber:
 *                     type: string
 *                   email:
 *                     type: string
 *               shippingAddress:
 *                 type: object
 *                 required:
 *                   - firstName
 *                   - lastName
 *                   - addressLine1
 *                   - city
 *                   - country
 *                   - state
 *                   - postalCode
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   addressLine1:
 *                     type: string
 *                   addressLine2:
 *                     type: string
 *                   aptSuite:
 *                     type: string
 *                   city:
 *                     type: string
 *                   country:
 *                     type: string
 *                   state:
 *                     type: string
 *                   postalCode:
 *                     type: string
 *               paymentInfo:
 *                 type: object
 *                 required:
 *                   - paymentMethod
 *                 properties:
 *                   cardNumber:
 *                     type: string
 *                   nameOnCard:
 *                     type: string
 *                   expirationDate:
 *                     type: string
 *                   cvc:
 *                     type: string
 *                   paymentMethod:
 *                     type: string
 *                     enum: [credit_card, COD, bank_transfer]
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid input or empty cart
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.post('/checkout', auth, async (req: Request, res: Response) => {
  try {
    const { contactInfo, shippingAddress, paymentInfo, selectedItems } = req.body;

    if (!selectedItems || !Array.isArray(selectedItems) || selectedItems.length === 0) {
      return res.status(400).json({ message: 'No items selected for checkout' });
    }

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user?._id })
                         .populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Filter selected items from cart
    const selectedCartItems = cart.items.filter(item => 
      selectedItems.includes(item._id.toString())
    );

    if (selectedCartItems.length === 0) {
      return res.status(400).json({ message: 'No valid items selected' });
    }

    // Validate stock availability and create order items
    const orderItems = [];
    let subtotal = 0;
    
    for (const item of selectedCartItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ 
          message: `Product ${item.product} not found` 
        });
      }

      // Check if product is still available in the requested size and quantity
      const sizeStock = product.sizes.find(s => s === item.size);
      if (!sizeStock) {
        return res.status(400).json({ 
          message: `Size ${item.size} is no longer available for ${product.name}` 
        });
      }

      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        product: item.product,
        quantity: item.quantity,
        size: item.size,
        price: item.price
      });
    }

    // Calculate order summary
    const shippingEstimate = 0; // You can implement shipping cost calculation logic
    const taxRate = 0.1; // 10% tax rate - you can adjust this
    const taxEstimate = subtotal * taxRate;
    const total = subtotal + shippingEstimate + taxEstimate;

    // Create new order
    const order = new Order({
      user: req.user?._id,
      items: orderItems,
      contactInfo,
      shippingAddress,
      paymentInfo,
      orderSummary: {
        subtotal,
        shippingEstimate,
        taxEstimate,
        total
      },
      status: 'pending',
      paymentStatus: 'pending'
    });

    await order.save();

    // Remove checked out items from cart
    cart.items = cart.items.filter(item => 
      !selectedItems.includes(item._id.toString())
    );
    await cart.save();

    // Populate order details
    await order.populate('items.product');
    await order.populate('user', 'name email');

    res.status(201).json(order);
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get user's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's orders
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user?._id })
                            .populate('items.product')
                            .sort({ created_at: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Get order details
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.get('/:orderId', auth, async (req: Request, res: Response) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      user: req.user?._id
    }).populate('items.product');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /api/orders/{orderId}/cancel:
 *   put:
 *     summary: Cancel an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Order not found
 *       400:
 *         description: Order cannot be cancelled
 *       500:
 *         description: Server error
 */
router.put('/:orderId/cancel', auth, async (req: Request, res: Response) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      user: req.user?._id
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({ 
        message: 'Order cannot be cancelled in current status' 
      });
    }

    order.status = 'cancelled';
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 