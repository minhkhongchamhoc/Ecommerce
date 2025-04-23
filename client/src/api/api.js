import authApi from './authApi';
import productsApi from './productsApi';
import categoriesApi from './categoriesApi';
import cartApi from './cartApi';
import ordersApi from './ordersApi';
import userApi from './userApi';

const API = {
  auth: authApi,
  products: productsApi,
  categories: categoriesApi,
  cart: cartApi,
  orders: ordersApi,
  user: userApi,
};

export default API;