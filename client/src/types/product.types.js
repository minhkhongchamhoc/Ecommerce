export const ProductSchema = {
  _id: 'string',
  name: 'string',
  description: 'string',
  price: 'number',
  category: {
    _id: 'string',
    name: 'string',
    description: 'string',
    created_at: 'string',
    modified_at: 'string',
  },
  images: ['string'],
  sizes: ['string'],
  stock: 'number',
  created_at: 'string',
  modified_at: 'string',
};

export const FilterSchema = {
  category: 'string',
  minPrice: 'number',
  maxPrice: 'number',
  size: 'string',
};

export const ApiProductResponseSchema = {
  _id: 'string',
  name: 'string',
  description: 'string',
  price: 'number',
  category: {
    _id: 'string',
    name: 'string',
    description: 'string',
    created_at: 'string',
    modified_at: 'string',
  },
  images: ['string'],
  sizes: ['string'],
  stock: 'number',
  created_at: 'string',
  modified_at: 'string',
};

export const ApiProductsPaginatedResponseSchema = {
  products: [
    {
      _id: 'string',
      name: 'string',
      description: 'string',
      price: 'number',
      category: {
        _id: 'string',
        name: 'string',
        description: 'string',
        created_at: 'string',
        modified_at: 'string',
      },
      images: ['string'],
      sizes: ['string'],
      stock: 'number',
      created_at: 'string',
      modified_at: 'string',
    },
  ],
  pagination: {
    total: 'number',
    page: 'number',
    limit: 'number',
    totalPages: 'number',
  },
};