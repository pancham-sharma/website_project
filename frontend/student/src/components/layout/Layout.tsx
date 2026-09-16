import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout: React.FC = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 lg:px-10 py-6 lg:py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
