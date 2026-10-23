import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-page text-content-primary transition-colors duration-200">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
