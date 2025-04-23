export const transformProductData = (apiData) => {
    return apiData.map(item => ({
      image: item.imageUrl || 'https://placehold.co/320x360',
      name: item.productName || 'Unknown Product',
      category: item.category || 'Uncategorized',
      rating: item.rating || 0,
      reviewCount: item.reviews || 0,
      currentPrice: item.price || 0,
      originalPrice: item.originalPrice || item.price || 0
    }));
  };