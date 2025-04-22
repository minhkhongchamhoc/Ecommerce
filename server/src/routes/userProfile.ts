import { Router, Request, Response } from 'express';
import UserProfile from '../models/UserProfile';
import auth from '../middleware/auth';
import { updateOrderInfo } from '../middleware/updateOrderInfo';

const router = Router();

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Profile not found
 */
router.get('/profile', auth, async (req: Request, res: Response) => {
  try {
    const profile = await UserProfile.findOne({ user: req.user?._id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /api/user/profile:
 *   post:
 *     summary: Create or update user profile
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 */
router.post('/profile', auth, async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, phoneNumber, dateOfBirth, gender } = req.body;
    
    let profile = await UserProfile.findOne({ user: req.user?._id });
    
    if (profile) {
      // Update existing profile
      profile.firstName = firstName || profile.firstName;
      profile.lastName = lastName || profile.lastName;
      profile.phoneNumber = phoneNumber || profile.phoneNumber;
      profile.dateOfBirth = dateOfBirth || profile.dateOfBirth;
      profile.gender = gender || profile.gender;
    } else {
      // Create new profile
      profile = new UserProfile({
        user: req.user?._id,
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth,
        gender
      });
    }
    
    await profile.save();
    
    // Update order information after profile update
    await updateOrderInfo(req, res, () => {});
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /api/user/addresses:
 *   post:
 *     summary: Add new address
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [home, work, other]
 *               addressLine1:
 *                 type: string
 *               addressLine2:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               isDefault:
 *                 type: boolean
 */
router.post('/addresses', auth, async (req: Request, res: Response) => {
  try {
    const profile = await UserProfile.findOne({ user: req.user?._id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const newAddress = req.body;
    
    // If this is the first address or marked as default, update other addresses
    if (newAddress.isDefault) {
      profile.addresses.forEach(addr => addr.isDefault = false);
    }

    profile.addresses.push(newAddress);
    await profile.save();
    
    // Update order information after address update
    await updateOrderInfo(req, res, () => {});
    
    res.json(profile.addresses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /api/user/payment-methods:
 *   post:
 *     summary: Add new payment method
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [credit_card, bank_transfer]
 *               cardNumber:
 *                 type: string
 *               nameOnCard:
 *                 type: string
 *               expirationDate:
 *                 type: string
 *               bankName:
 *                 type: string
 *               accountNumber:
 *                 type: string
 *               isDefault:
 *                 type: boolean
 */
router.post('/payment-methods', auth, async (req: Request, res: Response) => {
  try {
    const profile = await UserProfile.findOne({ user: req.user?._id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const newPaymentMethod = req.body;
    
    // If this is the first payment method or marked as default, update others
    if (newPaymentMethod.isDefault) {
      profile.paymentMethods.forEach(pm => pm.isDefault = false);
    }

    profile.paymentMethods.push(newPaymentMethod);
    await profile.save();
    
    res.json(profile.paymentMethods);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /api/user/preferences:
 *   put:
 *     summary: Update user preferences
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               language:
 *                 type: string
 *               currency:
 *                 type: string
 *               newsletterSubscription:
 *                 type: boolean
 */
router.put('/preferences', auth, async (req: Request, res: Response) => {
  try {
    const profile = await UserProfile.findOne({ user: req.user?._id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const { language, currency, newsletterSubscription } = req.body;
    
    profile.preferences = {
      language: language || profile.preferences.language,
      currency: currency || profile.preferences.currency,
      newsletterSubscription: newsletterSubscription !== undefined 
        ? newsletterSubscription 
        : profile.preferences.newsletterSubscription
    };

    await profile.save();
    res.json(profile.preferences);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 