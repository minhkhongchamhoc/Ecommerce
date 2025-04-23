import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './Navigation';
import { ProductsProvider } from './contexts/ProductContext';

function App() {
  return (
    <Router>
      <ProductsProvider>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
      </ProductsProvider>
    </Router>
  );
}

export default App;