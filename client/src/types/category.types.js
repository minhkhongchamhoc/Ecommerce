/**
 * @typedef {Object} Category
 * @property {string} id - Category identifier
 * @property {string} name - Category name
 * @property {string} description - Category description
 * @property {string} createdAt - Category creation date (ISO date string)
 * @property {string} updatedAt - Category modification date (ISO date string)
 */

/**
 * @typedef {Object} CategoryCreateRequest
 * @property {string} name - Category name
 * @property {string} description - Category description
 */

/**
 * @typedef {Object} CategoryCreateResponse
 * @property {string} id - Category identifier
 * @property {string} name - Category name
 * @property {string} description - Category description
 * @property {string} createdAt - Category creation date (ISO date string)
 * @property {string} updatedAt - Category modification date (ISO date string)
 */

/**
 * @typedef {Object} CategoryUpdateRequest
 * @property {string} [name] - Category name
 * @property {string} [description] - Category description
 */

/**
 * @typedef {Object} CategoryUpdateResponse
 * @property {string} id - Category identifier
 * @property {string} name - Category name
 * @property {string} description - Category description
 * @property {string} createdAt - Category creation date (ISO date string)
 * @property {string} updatedAt - Category modification date (ISO date string)
 */

/**
 * @typedef {Category[]} CategoryGetAllResponse - List of categories
 */

/**
 * @typedef {Object} CategoryGetByIdResponse
 * @property {string} id - Category identifier
 * @property {string} name - Category name
 * @property {string} description - Category description
 * @property {string} createdAt - Category creation date (ISO date string)
 * @property {string} updatedAt - Category modification date (ISO date string)
 */

/**
 * @typedef {Object} CategoryDeleteResponse - Empty response for category deletion
 */

export {};