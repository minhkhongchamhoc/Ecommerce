import React from 'react';
import Header from './src/components/Header';
import Footer from './src/components/Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-full max-w-full mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;