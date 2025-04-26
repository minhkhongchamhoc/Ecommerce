/**
 * @typedef {Object} LoginRequest
 * @property {string} email - User email
 * @property {string} password - User password
 */

/**
 * @typedef {Object} LoginResponse
 * @property {string} token - Authentication token
 * @property {Object} user - User information
 * @property {string} user.id - User identifier
 * @property {string} user.email - User email
 * @property {string} user.role - User role
 */

/**
 * @typedef {Object} RegisterRequest
 * @property {string} email - User email
 * @property {string} password - User password
 * @property {string} name - User name
 */

/**
 * @typedef {Object} RegisterResponse
 * @property {string} token - Authentication token
 * @property {Object} user - User information
 * @property {string} user.id - User identifier
 * @property {string} user.email - User email
 * @property {string} user.role - User role
 */

export {};