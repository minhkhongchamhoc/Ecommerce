import { Request, Response, NextFunction } from 'express';
import Order from '../models/Order';
import UserProfile from '../models/UserProfile';

export const updateOrderInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?._id;
    const profile = await UserProfile.findOne({ user: userId });
    
    if (!profile) {
      return next();
    }

    // Get default payment method if exists
    const defaultPaymentMethod = profile.paymentMethods.find(pm => pm.isDefault);

    // Update all pending orders with new user information
    await Order.updateMany(
      { 
        user: userId,
        status: 'pending'
      },
      {
        $set: {
          'contactInfo.phoneNumber': profile.phoneNumber,
          'contactInfo.email': req.user?.email,
          'shippingAddress.firstName': profile.firstName,
          'shippingAddress.lastName': profile.lastName,
          // Update default address if exists
          ...(profile.addresses.find(addr => addr.isDefault) && {
            'shippingAddress.addressLine1': profile.addresses.find(addr => addr.isDefault)?.addressLine1,
            'shippingAddress.addressLine2': profile.addresses.find(addr => addr.isDefault)?.addressLine2,
            'shippingAddress.city': profile.addresses.find(addr => addr.isDefault)?.city,
            'shippingAddress.state': profile.addresses.find(addr => addr.isDefault)?.state,
            'shippingAddress.country': profile.addresses.find(addr => addr.isDefault)?.country,
            'shippingAddress.postalCode': profile.addresses.find(addr => addr.isDefault)?.postalCode
          }),
          // Update payment info if default payment method exists
          ...(defaultPaymentMethod && {
            'paymentInfo.paymentMethod': defaultPaymentMethod.type,
            'paymentInfo.cardNumber': defaultPaymentMethod.cardNumber,
            'paymentInfo.nameOnCard': defaultPaymentMethod.nameOnCard,
            'paymentInfo.expirationDate': defaultPaymentMethod.expirationDate,
            'paymentInfo.cvc': defaultPaymentMethod.cvc
          })
        }
      }
    );

    next();
  } catch (error) {
    console.error('Error updating order information:', error);
    next();
  }
}; 