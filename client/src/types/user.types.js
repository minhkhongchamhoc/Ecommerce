/**
 * @typedef {Object} Address
 * @property {string} type - Address type (enum: ['home', 'work', 'other'])
 * @property {string} addressLine1 - Primary address line
 * @property {string} [addressLine2] - Secondary address line
 * @property {string} city - City
 * @property {string} state - State or province
 * @property {string} postalCode - Postal or ZIP code
 * @property {string} country - Country
 * @property {boolean} isDefault - Whether this is the default address
 */

/**
 * @typedef {Object} User
 * @property {string} user - ObjectId reference to User model
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name
 * @property {string} [phoneNumber] - User's phone number
 * @property {string} [dateOfBirth] - User's date of birth (ISO date string)
 * @property {string} [gender] - User's gender (enum: ['male', 'female', 'other'])
 * @property {Address[]} addresses - List of user addresses
 */

export {};