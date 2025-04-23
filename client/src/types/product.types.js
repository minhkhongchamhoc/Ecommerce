export const ProductSchema = {
    image: 'string',
    name: 'string',
    category: 'string',
    rating: 'number',
    reviewCount: 'number',
    currentPrice: 'number',
    originalPrice: 'number'
  };
  
  export const FilterSchema = {
    category: 'string',
    minPrice: 'string',
    maxPrice: 'string'
  };
  
  export const ApiProductResponseSchema = {
    imageUrl: 'string',
    productName: 'string',
    category: 'string',
    rating: 'number',
    reviews: 'number',
    price: 'number',
    originalPrice: 'number'
  };