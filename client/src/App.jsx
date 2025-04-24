import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './Navigation';
import { ProductsProvider } from './contexts/ProductContext';
import CategoriesProvider from './contexts/CategoriesContext';
import { CartProvider } from './contexts/CartContext';
import { OrdersProvider } from './contexts/OrderContext';
import { UserProvider } from './contexts/UserContext';


function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
        <CategoriesProvider>
          <ProductsProvider>
            <CartProvider>
             <OrdersProvider>
            <Navigation />
            </OrdersProvider>
            </CartProvider>
          </ProductsProvider>
        </CategoriesProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;