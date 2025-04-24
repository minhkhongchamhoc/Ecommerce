import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './Navigation';
import { ProductsProvider } from './contexts/ProductContext';
import CategoriesProvider from './contexts/CategoriesContext';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CategoriesProvider>
          <ProductsProvider>
            <CartProvider>
            <Navigation />
            </CartProvider>
          </ProductsProvider>
        </CategoriesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;