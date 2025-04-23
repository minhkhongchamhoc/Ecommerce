import { Router, Request, Response } from 'express';
import Order from '../models/Order';
import Cart from '../models/Cart';
import Product from '../models/Product';
import auth from '../middleware/auth';
import { checkRole } from '../middleware/checkRole';
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

/**
 * @swagger
 * /api/orders/{orderId}/status:
 *   put:
 *     summary: Update order status (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
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
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [confirmed, shipping, delivered, cancelled]
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Access denied (Admin only)
 *       404:
 *         description: Order not found
 *       400:
 *         description: Invalid status or status transition
 *       500:
 *         description: Server error
 */
router.put('/:orderId/status', [auth, checkRole('admin')], async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const { orderId } = req.params;

    // Validate orderId format
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ 
        message: 'Invalid order ID format' 
      });
    }

    // Validate status
    const validStatuses = ['confirmed', 'shipping', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        message: 'Invalid status. Must be one of: confirmed, shipping, delivered, cancelled' 
      });
    }

    // Find order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Validate status transition
    const currentStatus = order.status;
    const validTransitions: { [key: string]: string[] } = {
      'pending': ['confirmed', 'cancelled'],
      'confirmed': ['shipping', 'cancelled'],
      'shipping': ['delivered', 'cancelled'],
      'delivered': [],
      'cancelled': []
    };

    if (!validTransitions[currentStatus].includes(status)) {
      return res.status(400).json({ 
        message: `Cannot transition from ${currentStatus} to ${status}. Valid transitions from ${currentStatus} are: ${validTransitions[currentStatus].join(', ')}` 
      });
    }

    // Handle payment status based on order status
    if (status === 'confirmed') {
      // When order is confirmed, check payment method
      if (order.paymentInfo.paymentMethod === 'COD') {
        // For COD, payment status remains pending
        order.paymentStatus = 'pending';
      } else {
        // For other payment methods, payment should be paid
        if (order.paymentStatus !== 'paid') {
          return res.status(400).json({ 
            message: 'Payment must be completed before confirming order' 
          });
        }
      }
    } else if (status === 'delivered') {
      // When order is delivered, update payment status for COD
      if (order.paymentInfo.paymentMethod === 'COD') {
        order.paymentStatus = 'paid';
      }
    } else if (status === 'cancelled') {
      // When order is cancelled, handle payment status
      if (order.paymentStatus === 'paid') {
        // TODO: Implement refund process
        order.paymentStatus = 'failed';
      } else {
        order.paymentStatus = 'failed';
      }
    }

    // Update order status
    order.status = status;
    order.modified_at = new Date();
    await order.save();

    // TODO: Send email notification to customer about status change
    // TODO: Update product stock if needed

    res.json({
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ 
        message: 'Invalid order ID format' 
      });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /api/orders/{orderId}/payment:
 *   put:
 *     summary: Update order payment status (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
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
 *               - paymentStatus
 *             properties:
 *               paymentStatus:
 *                 type: string
 *                 enum: [pending, paid, failed]
 *     responses:
 *       200:
 *         description: Payment status updated successfully
 *       400:
 *         description: Invalid payment status
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.put('/:orderId/payment', [auth, checkRole('admin')], async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { paymentStatus } = req.body;

    // Validate orderId format
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ 
        message: 'Invalid order ID format' 
      });
    }

    // Validate payment status
    const validPaymentStatuses = ['pending', 'paid', 'failed'];
    if (!validPaymentStatuses.includes(paymentStatus)) {
      return res.status(400).json({ 
        message: 'Invalid payment status. Must be one of: pending, paid, failed' 
      });
    }

    // Find order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Validate payment method
    if (order.paymentInfo.paymentMethod === 'COD' && paymentStatus === 'paid' && order.status !== 'delivered') {
      return res.status(400).json({ 
        message: 'COD payment can only be marked as paid upon delivery' 
      });
    }

    // Update payment status
    order.paymentStatus = paymentStatus;
    order.modified_at = new Date();
    await order.save();

    // TODO: Send email notification about payment status change

    res.json({
      message: 'Payment status updated successfully',
      order
    });
  } catch (error) {
    console.error('Update payment status error:', error);
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ 
        message: 'Invalid order ID format' 
      });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 