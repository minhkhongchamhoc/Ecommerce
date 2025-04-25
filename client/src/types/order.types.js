/**
 * Represents an item in an order.
 * @typedef {Object} OrderItem
 * @property {string} productId - The ID of the product.
 * @property {string} name - The name of the product.
 * @property {number} quantity - The quantity ordered.
 * @property {string} size - The size of the product.
 * @property {number} price - The price per item.
 * @property {string} [image] - Optional image URL of the product.
 */
const OrderItem = {};

/**
 * Represents a shipping address.
 * @typedef {Object} ShippingAddress
 * @property {string} firstName - First name of the recipient.
 * @property {string} lastName - Last name of the recipient.
 * @property {string} addressLine1 - Primary address line.
 * @property {string} [aptSuite] - Optional apartment or suite number.
 * @property {string} [addressLine2] - Optional secondary address line.
 * @property {string} city - City of the address.
 * @property {string} country - Country of the address.
 * @property {string} state - State or province of the address.
 * @property {string} postalCode - Postal or ZIP code.
 */
const ShippingAddress = {};

/**
 * Represents payment information.
 * @typedef {Object} PaymentInfo
 * @property {string} cardNumber - Credit card number.
 * @property {string} nameOnCard - Name on the card.
 * @property {string} expirationDate - Expiry date (MM/YY).
 * @property {string} cvc - Card verification code.
 * @property {'credit_card'} paymentMethod - Payment method.
 */
const PaymentInfo = {};

/**
 * Represents the payload for a checkout request.
 * @typedef {Object} CheckoutPayload
 * @property {string[]} selectedItems - Array of product IDs in the order.
 * @property {ShippingAddress} shippingAddress - Shipping address details.
 * @property {Object} contactInfo - Contact information.
 * @property {string} contactInfo.phoneNumber - Phone number.
 * @property {string} contactInfo.email - Email address.
 * @property {PaymentInfo} paymentInfo - Payment information.
 */
const CheckoutPayload = {};

/**
 * Represents an order.
 * @typedef {Object} Order
 * @property {string} _id - Unique order ID.
 * @property {string} userId - ID of the user who placed the order.
 * @property {OrderItem[]} items - Array of items in the order.
 * @property {ShippingAddress} shippingAddress - Shipping address details.
 * @property {Object} contactInfo - Contact information.
 * @property {string} contactInfo.phone - Phone number.
 * @property {string} contactInfo.email - Email address.
 * @property {PaymentInfo} paymentDetails - Payment details.
 * @property {number} total - Total order amount.
 * @property {'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'} status - Order status.
 * @property {string} createdAt - Timestamp when the order was created.
 * @property {string} updatedAt - Timestamp when the order was last updated.
 */
const Order = {};

/**
 * Represents the response from a checkout request.
 * @typedef {Object} CheckoutResponse
 * @property {Order} order - The created order.
 * @property {string} message - Response message.
 */
const CheckoutResponse = {};

export { OrderItem, ShippingAddress, PaymentInfo, CheckoutPayload, Order, CheckoutResponse };