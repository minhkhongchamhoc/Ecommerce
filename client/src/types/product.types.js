/**
 * @typedef {Object} Product
 * @property {string} _id - Unique identifier for the product
 * @property {string} name - Product name
 * @property {string} description - Product description
 * @property {number} price - Product price
 * @property {Object} category - Product category
 * @property {string} category._id - Category identifier
 * @property {string} category.name - Category name
 * @property {string} category.description - Category description
 * @property {string} category.created_at - Category creation date (ISO date string)
 * @property {string} category.modified_at - Category modification date (ISO date string)
 * @property {string[]} images - List of product image URLs
 * @property {string[]} sizes - List of available sizes
 * @property {number} stock - Available stock quantity
 * @property {string} created_at - Product creation date (ISO date string)
 * @property {string} modified_at - Product modification date (ISO date string)
 */

/**
 * @typedef {Object} Filter
 * @property {string} [category] - Category filter
 * @property {number} [minPrice] - Minimum price filter
 * @property {number} [maxPrice] - Maximum price filter
 * @property {string} [size] - Size filter
 */

/**
 * @typedef {Object} ApiProductResponse
 * @property {string} _id - Unique identifier for the product
 * @property {string} name - Product name
 * @property {string} description - Product description
 * @property {number} price - Product price
 * @property {Object} category - Product category
 * @property {string} category._id - Category identifier
 * @property {string} category.name - Category name
 * @property {string} category.description - Category description
 * @property {string} category.created_at - Category creation date (ISO date string)
 * @property {string} category.modified_at - Category modification date (ISO date string)
 * @property {string[]} images - List of product image URLs
 * @property {string[]} sizes - List of available sizes
 * @property {number} stock - Available stock quantity
 * @property {string} created_at - Product creation date (ISO date string)
 * @property {string} modified_at - Product modification date (ISO date string)
 */

/**
 * @typedef {Object} ApiProductsPaginatedResponse
 * @property {Product[]} products - List of products
 * @property {Object} pagination - Pagination information
 * @property {number} pagination.total - Total number of products
 * @property {number} pagination.page - Current page number
 * @property {number} pagination.limit - Number of products per page
 * @property {number} pagination.totalPages - Total number of pages
 */

export {};