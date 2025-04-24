/**
 * @typedef {Object} CartItem
 * @property {string} _id - Cart item ID
 * @property {Object} product - Product details
 * @property {string} product._id - Product ID
 * @property {string} product.name - Product name
 * @property {string[]} product.images - Product image URLs
 * @property {number} quantity - Item quantity
 * @property {'S' | 'M' | 'L' | 'XL' | 'XXL'} size - Item size
 * @property {number} price - Item price
 */

/**
 * @typedef {Object} Cart
 * @property {string} user - User ID
 * @property {CartItem[]} items - Array of cart items
 */

/**
 * @typedef {Object} AddCartItemRequest
 * @property {string} productId - Product ID
 * @property {number} quantity - Quantity to add
 * @property {'S' | 'M' | 'L' | 'XL' | 'XXL'} size - Size
 */

/**
 * @typedef {Object} UpdateCartItemRequest
 * @property {number} [quantity] - New quantity
 * @property {'S' | 'M' | 'L' | 'XL' | 'XXL'} [size] - New size
 */

/**
 * @typedef {Object} CartApiResponse
 * @property {boolean} success - API success status
 * @property {Cart} data - Cart data
 */

/**
 * @typedef {Object} ErrorResponse
 * @property {string} message - Error message
 */